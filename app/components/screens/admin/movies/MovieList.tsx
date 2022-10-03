import { FC } from "react";

import AdminNavigation from "@/ui/admin-navigation/AdminNavigation";
import AdminHeader from "@/ui/admin-table/AdminHeader/AdminHeader";
import AdminTable from "@/ui/admin-table/AdminTable/AdminTable";
import Heading from "@/ui/heading/Heading";

import Meta from "@/utils/meta/Meta";

import { useMovies } from "./useMovies";

const MovieList: FC = () => {
  const {
    isLoading,
    searchTerm,
    handleSearch,
    createAsync,
    deleteAsync,
    data,
  } = useMovies();

  return (
    <Meta title="Movies">
      <AdminNavigation />
      <Heading title="Movies" />

      <AdminHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <AdminTable
        isLoading={isLoading}
        removeHandler={deleteAsync}
        headerItems={["Title", "Genre", "Rating"]}
        tableItems={data || []}
      />
    </Meta>
  );
};

export default MovieList;
