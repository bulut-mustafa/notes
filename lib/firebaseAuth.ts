"use server";
import { revalidatePath } from "next/cache";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase";

export const registerNewUser = async (
  email: string,
  password: string,
  name: string,
  lastname: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = userCredential.user;
    await updateProfile(newUser, {
      displayName: `${name} ${lastname}`,
      photoURL: "",
    });
    revalidatePath("/");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;
    console.log(user);
    // Convert user instance to plain object
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};


export async function uploadPicture(imageUrl: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  // 🔹 Update Firebase Auth profile with new image URL
  await updateProfile(user, { photoURL: imageUrl });
}
