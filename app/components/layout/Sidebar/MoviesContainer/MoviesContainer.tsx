import dynamic from "next/dynamic";

import PopularMovies from "./PopularMovies";

const DynamicFavoriteMovies = dynamic(
  () => import("./FavoriteMovies/FavoriteMovies"),
  { ssr: false }
);

const MoviesContainer: React.FC = () => {
  return (
    <div>
      <PopularMovies />
      <DynamicFavoriteMovies />
    </div>
  );
};

export default MoviesContainer;