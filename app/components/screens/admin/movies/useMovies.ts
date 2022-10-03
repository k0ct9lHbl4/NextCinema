import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { MovieService } from "@/services/movie.service";

import { getGenresList } from "@/utils/movie/getGenresList";
import { toastError } from "@/utils/toast-error";

import { getAdminUrl } from "@/config/url.config";

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const queryData = useQuery(
    ["movie list", debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminUrl(`movie/edit/${movie._id}`),
            items: [
              movie.title,
              getGenresList(movie.genres),
              String(movie.rating),
            ],
          })
        ),

      onError: (error) => {
        toastError(error, "Movie List");
      },
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { push } = useRouter();

  const { mutateAsync: createAsync } = useMutation(
    "create movie",
    () => MovieService.create(),
    {
      onSuccess: ({ data: _id }) => {
        toastr.success("Create movie", "create was successful");
        push(getAdminUrl(`movie/edit/${_id}`));
      },
      onError: (error) => {
        toastError(error, "Create movie");
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete movie",
    (movieId: string) => MovieService.delete(movieId),
    {
      onSuccess: () => {
        toastr.success("Delete movie", "delete was successful");
        queryData.refetch();
      },
      onError: (error) => {
        toastError(error, "Delete movie");
      },
    }
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      createAsync,
      deleteAsync,
    }),
    [queryData, searchTerm, deleteAsync]
  );
};
