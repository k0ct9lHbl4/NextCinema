import { FC } from "react";

import AdminNavigation from "@/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useUsers } from "./useUsers";

const UserList: FC = () => {
  const { isLoading, searchTerm, handleSearch, deleteAsync, data } = useUsers();

  return (
    <Meta title="Users">
      <AdminNavigation />
      <Heading title="Users" />

      <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Email", "Date register"]}
        tableItems={data || []}
      />
    </Meta>
  );
};

export default UserList;
