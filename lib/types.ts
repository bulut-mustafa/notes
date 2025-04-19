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
  content: string;
  image: string[];
  tags: string[];
  archived: boolean;
  isDeleted: boolean;
  newsAttached: string[];
  isFavorite: boolean;
}
export type Note = {
  id: string;
  userId: string;
  content: string;
  image: string[];
  tags: string[];
  archived: boolean;
  isDeleted: boolean;
  newsAttached: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
