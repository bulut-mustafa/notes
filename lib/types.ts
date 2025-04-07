export type authUser = {
    uid: string;
    displayName: string | null;
    photoURL?: string | null;
    email: string | null;
  };

export type Tag = {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };


export type NoteFormData = {
  title: string;
  content: string;
  image: string[];
  tags: string[];
  status: string;
  newsAttached: string[];
  isFavorite: boolean;
}
export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  image: string[];
  tags: string[];
  status: string;
  newsAttached: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
