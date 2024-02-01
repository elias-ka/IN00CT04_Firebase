import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  timestamp: number;
}

export async function getTasks(): Promise<Task[]> {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      timestamp: data.timestamp,
    };
  });
}

export async function addTask(
  title: string,
  description: string,
): Promise<Task> {
  const newTaskRef = doc(collection(db, "tasks"));
  const newTask = {
    title,
    description,
    completed: false,
    timestamp: Date.now(),
  };
  await setDoc(newTaskRef, newTask);
  return {
    id: newTaskRef.id,
    ...newTask,
  };
}

export async function deleteTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}

export async function updateTask(task: Task) {
  await setDoc(doc(db, "tasks", task.id), task);
}
