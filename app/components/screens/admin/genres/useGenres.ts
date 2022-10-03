import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { GenreService } from "@/services/genre.service";

import { toastError } from "@/utils/toast-error";

import { getAdminUrl } from "@/config/url.config";

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const queryData = useQuery(
    ["genre list", debouncedSearch],
    () => GenreService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (genre): ITableItem => ({
            _id: genre._id,
            editUrl: getAdminUrl(`genre/edit/${genre._id}`),
            items: [genre.name, genre.slug],
          })
        ),

      onError: (error) => {
        toastError(error, "Genre List");
      },
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { push } = useRouter();

  const { mutateAsync: createAsync } = useMutation(
    "create genre",
    () => GenreService.create(),
    {
      onSuccess: ({ data: _id }) => {
        toastr.success("Create genre", "create was successful");
        push(getAdminUrl(`genre/edit/${_id}`));
      },
      onError: (error) => {
        toastError(error, "Create genre");
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete genre",
    (genreId: string) => GenreService.delete(genreId),
    {
      onSuccess: () => {
        toastr.success("Delete genre", "delete was successful");
        queryData.refetch();
      },
      onError: (error) => {
        toastError(error, "Delete genre");
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
    [queryData, searchTerm, createAsync, deleteAsync]
  );
};
