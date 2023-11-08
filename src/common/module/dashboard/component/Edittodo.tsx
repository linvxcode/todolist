"use client";
import React, { useEffect, useState } from "react";
import app from "@/common/libs/firebase/init";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@nextui-org/react";

const Edittodo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [items, setItems] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {id} = useParams();
  const firestore = getFirestore(app);

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "tasks"));
      const tasksData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const datas = tasksData?.find((item: any) => item.id === id);
      if (datas) {
        setItems(datas);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditTask = async () => {
    try {
      const taskDocRef = doc(firestore, "tasks", items.id);
      const newData = {
        name: items.name,
        description: items.description,
        position: items.position,
        is_complete: items.is_complete,
        user_id: items.user_id, 
      };

      await updateDoc(taskDocRef, newData);
      onOpenChange(); 
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


  return (
    <div className="flex justify-center mt-5">
      <Card className="w-[40%] flex justify-center items-center">
        <CardBody className="">
          <div className="">
            {loading ? (
              <>
                <h1>Loading....</h1>
              </>
            ) : (
              <div className="w-[100%] flex justify-center items-start px-10 flex-col">
                <h1 className="text-xl">Name: {items?.name}</h1>
                <h1 className="text-xl">Description: {items?.description}</h1>
                <h1 className="text-xl">Position: {items?.position}</h1>
                <h1 className="text-xl">
                  Is Complete: {items.is_complete.toString()}
                </h1>
                <h1 className="text-xl">Username: {items?.user_id}</h1>
                <Button onPress={onOpen} className="flex w-[50px]">
                  Edit
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Modal Title
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            label="Name"
                            type="text"
                            placeholder="Name"
                            value={items?.name}
                            onChange={(e) =>
                              setItems({ ...items, name: e.target.value })
                            }
                          />
                          <Input
                            label="Description"
                            type="text"
                            placeholder="Description"
                            value={items?.description}
                            onChange={(e) =>
                              setItems({
                                ...items,
                                description: e.target.value,
                              })
                            }
                          />
                          <Select
                            label="Is Complete"
                            className="max-w-xs"
                            onChange={(e) =>
                              setItems({
                                ...items,
                                is_complete: e.target.value === "true",
                              })
                            }
                          >
                            <SelectItem key="false" value="false">
                              false
                            </SelectItem>
                            <SelectItem key="true" value="true">
                              true
                            </SelectItem>
                          </Select>
                          <Input
                            label="Position"
                            type="text"
                            placeholder="Position"
                            value={items?.position}
                            onChange={(e) =>
                              setItems({ ...items, position: e.target.value })
                            }
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" onPress={handleEditTask}>
                            Action
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Edittodo;
