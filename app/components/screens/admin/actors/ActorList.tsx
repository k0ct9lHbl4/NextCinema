import { FC } from "react";

import AdminNavigation from "@/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useActors } from "./useActors";

const ActorList: FC = () => {
  const {
    isLoading,
    searchTerm,
    handleSearch,
    createAsync,
    deleteAsync,
    data,
  } = useActors();

  return (
    <Meta title="Actors">
      <AdminNavigation />
      <Heading title="Actors" />

      <AdminHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Name", "Count movies"]}
        tableItems={data || []}
      />
    </Meta>
  );
};

export default ActorList;
