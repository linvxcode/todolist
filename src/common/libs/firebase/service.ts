import {addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where} from 'firebase/firestore'
import app from './init'
import bcrypt from 'bcrypt'
const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        // created_at: doc.data().created_at,
        // description: doc.data().description,
        // is_complete: doc.data().is_complete,
        // position: doc.data().position,
    }));

    return data;
}

export async function retriveDataBySLug(collectionName: string, slug: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, slug));
    const data = snapshot.data();
    return data;
}
export async function retriveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName));
    const data = snapshot.data();
    return data;
}

export async function register(
    data: {name:string; email:string; password:string; role:string;}
    )
    {
        const q = query(collection(firestore, "user"), where("email", "==", data.email));
        const snapshot = await getDocs(q);
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))

        if(users.length > 0){
            return{status: false, statusCode: 400, message: "Email Already Exist"}
        }else{
            data.role = "member",
            data.password = await bcrypt.hash(data.password, 10);

            try {
                await addDoc(collection(firestore, "users"), data)
                return{status:true,statusCode: 200, message: 'Register Succes'}

            } catch (error) {
                return {status: false,statusCode: 400, message:"Register Failed"}
            }

        }
}

export async function login(data: {email:string}) {
    const  q = query(
        collection(firestore, 'users'),
        where('email', '==' , data.email),
    )
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    if(users){
        return users[0];
    }else{
        return null
    }
}