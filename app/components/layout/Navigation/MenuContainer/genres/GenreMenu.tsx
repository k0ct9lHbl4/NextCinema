import SkeletonLoader from "@/ui/SkeletonLoader";

import Menu from "../Menu";
import { usePopularGenres } from "../genres/usePopularGenres";

const GenreMenu: React.FC = () => {
  const { isLoading, data } = usePopularGenres();

  return isLoading ? (
    <div className="mx-11 mb-6">
      <SkeletonLoader count={4} className="h-7 mt-6 first:h-5 first:mt-0" />
      <SkeletonLoader count={1} className="h-7 mt-6 mb-7" />
    </div>
  ) : (
    <Menu menu={{ title: "Popular genres", items: data || [] }} />
  );
};

export default GenreMenu;
