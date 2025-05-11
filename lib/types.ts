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
    count: number;
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

export type NewsItem = {
  id: string; 
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  publishedAt: string;
}

export type SavedNews = {
  id: string;
  userId: string;
  newsId: string;
  noteId: string;
  title: string;
  description: string;
  source: string;
  image: string;
  url: string;
  publishedAt: string;
  createdAt: string;
}
