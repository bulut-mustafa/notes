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
