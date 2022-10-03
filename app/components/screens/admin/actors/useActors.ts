import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { ITableItem } from "@/ui/admin-table/AdminTable/admin-table.interface";

import { useDebounce } from "@/hooks/useDebounce";

import { ActorService } from "@/services/actor.service";

import { toastError } from "@/utils/toast-error";

import { getAdminUrl } from "@/config/url.config";

export const useActors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const queryData = useQuery(
    ["actor list", debouncedSearch],
    () => ActorService.getAll(debouncedSearch),
    {
      select: ({ data }) =>
        data.map(
          (actor): ITableItem => ({
            _id: actor._id,
            editUrl: getAdminUrl(`actor/edit/${actor._id}`),
            items: [actor.name, String(actor.countMovies)],
          })
        ),

      onError: (error) => {
        toastError(error, "Actor List");
      },
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { push } = useRouter();

  const { mutateAsync: createAsync } = useMutation(
    "create actor",
    () => ActorService.create(),
    {
      onSuccess: ({ data: _id }) => {
        toastr.success("Create actor", "create was successful");
        push(getAdminUrl(`actor/edit/${_id}`));
      },
      onError: (error) => {
        toastError(error, "Create actor");
      },
    }
  );

  const { mutateAsync: deleteAsync } = useMutation(
    "delete actor",
    (actorId: string) => ActorService.delete(actorId),
    {
      onSuccess: () => {
        toastr.success("Delete actor", "delete was successful");
        queryData.refetch();
      },
      onError: (error) => {
        toastError(error, "Delete actor");
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
