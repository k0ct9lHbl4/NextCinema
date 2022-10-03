import { FC } from "react";

import { useFavorites } from "@/screens/favorites/useFavorites";

import SkeletonLoader from "@/ui/SkeletonLoader";

import { useAuth } from "@/hooks/useAuth";

import MovieList from "../MovieList";

import NotAuthFavorites from "./NotAuthFavorites";

const FavoriteMovies: FC = () => {
  const { isLoading, favoriteMovies } = useFavorites();
  const { user } = useAuth();

  if (!user) return <NotAuthFavorites />;

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={4} className="h-24 mb-5 first:h-7 first:mb-5" />
      <SkeletonLoader count={1} className="h-11" />
    </div>
  ) : favoriteMovies?.length ? (
    <MovieList
      link="/favorites"
      movies={favoriteMovies?.slice(0, 3) || []}
      title="Favorites"
    />
  ) : (
    <div className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80">
      You haven't added any movies to your favorites!
    </div>
  );
};

export default FavoriteMovies;
