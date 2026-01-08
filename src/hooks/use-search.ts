import { useState, useCallback } from "react";
import { Project } from "@/types/domain";
import { ApiResponse } from "@/types/api";

export const useSearch = () => {
  const [results, setResults] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query)}`);
      const json: ApiResponse<Project[]> = await res.json();
      if (json.success && json.data) {
        setResults(json.data);
      }
    } catch (err) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { results, isLoading, search };
};