"use client";
// components/TodoList.tsx
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  deleteDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";

import app from "@/common/libs/firebase/init";
import { useSession } from "next-auth/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import TablePage from "./Table";

const TodoList = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: session, status }: { data: any; status: string } = useSession();

  const firestore = getFirestore(app);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setdescription] = useState("");
  const [is_complete, setIs_complete] = useState(false);
  const [position, setPosition] = useState(0);
  const [userId, setUserId] = useState("");
  const [tasks, setTasks] = useState<any>([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const username = session?.user?.name;

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "tasks"));
      const tasksData: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (taskName.trim() === "") return;

    const taskData = {
      name: taskName,
      description: description,
      user_id: username,
      position: position,
      is_complete: is_complete,
      createdAt: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(firestore, "tasks"), taskData);
      setTaskName("");
      onOpenChange();
      fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTask = async (taskId: string, newName: string) => {
    if (newName.trim() === "") return;
    try {
      const taskDocRef: any = doc(firestore, "tasks", taskId);
      await updateDoc(taskDocRef, { name: newName });
      setEditingTaskId(null);
      fetchTasks(); 
      setTaskName("");
      setPosition(0);
      setdescription("");
      closeModal();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const confirm: any = window.confirm("Are You Sure");
      if (confirm) {
        const taskDocRef: any = doc(firestore, "tasks", taskId);
        await deleteDoc(taskDocRef);
        fetchTasks(); 
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl mb-4">To-Do List</h1>
      <div className="mb-4">
        <Button onPress={onOpen} className="flex w-[100px] px-10">
          Add New Task
        </Button>
      </div>
      <ul>
        <TablePage
          tasks={tasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
        
      </ul>
     
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
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <Input
                  label="Description"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
                <Select label="Is Complete" className="max-w-xs">
                  <SelectItem key="false" value="false">
                    false
                  </SelectItem>
                  <SelectItem key="true" value="true">
                    true
                  </SelectItem>
                </Select>
                <Input
                  label="Position"
                  type="number"
                  placeholder="Position"
                  value={position.toString()}
                  onChange={(e) => setPosition(Number(e.target.value))}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleAddTask}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
     
    </div>
  );
};

export default TodoList;
