import { useQuery } from "react-query";

import SkeletonLoader from "@/ui/SkeletonLoader";

import { MovieService } from "@/services/movie.service";

import MovieList from "./MovieList";

const PopularMovies: React.FC = () => {
  const { isLoading, data: popularMovies } = useQuery(
    "Popular movies in sidebar",
    () => MovieService.getMostPopularMovies(),
    {
      select: (data) => data.slice(0, 3),
    }
  );

  return isLoading ? (
    <div className="mt-11">
      <SkeletonLoader count={4} className="h-24 mb-5 first:h-7 first:mb-5" />
      <SkeletonLoader count={1} className="h-11" />
    </div>
  ) : (
    <MovieList
      link="/trending"
      movies={popularMovies || []}
      title="Popular Movies"
    />
  );
};

export default PopularMovies;
