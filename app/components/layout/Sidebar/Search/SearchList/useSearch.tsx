import React from "react";
import { useQuery } from "react-query";

import { useDebounce } from "@/hooks/useDebounce";

import { MovieService } from "@/services/movie.service";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { isSuccess, data } = useQuery(
    ["search movie list", debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) => data,
      enabled: !!debouncedSearch,
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { isSuccess, handleSearch, data, searchTerm };
};
