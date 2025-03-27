// context/tags-context.tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getTags, addTag as addTagToDB } from "@/lib/actions";
import { useAuth } from "@/context/auth-context";
import { Tag } from "@/lib/types";

interface TagsContextProps {
  tags: Tag[];
  loading: boolean;
  fetchTags: () => void;
  addTag: (name: string) => void;
}

const TagsContext = createContext<TagsContextProps | undefined>(undefined);

export const TagsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTags = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getTags(user.uid);
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addTag = async (name: string) => {
    if (!user) return;
    await addTagToDB(user.uid, name);
    fetchTags(); // Refresh
  };

  useEffect(() => {
    fetchTags();
  }, [user, fetchTags]);

  return (
    <TagsContext.Provider value={{ tags, loading, fetchTags, addTag }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) throw new Error("useTags must be used within TagsProvider");
  return context;
};
