import dynamic from "next/dynamic";
import { FC } from "react";

import Banner from "@/ui/banner/Banner";
import Gallery from "@/ui/gallery/Gallery";
import { IGalleryItem } from "@/ui/gallery/gallery.interface";
import SubHeading from "@/ui/heading/SubHeading";

import { IMovie } from "@/shared/types/movie.types";

import Meta from "@/utils/meta/Meta";

import Content from "./Content/Content";
import { useUpdateCountOpened } from "./useUpdateCountOpened";

const DymanicPlayer = dynamic(() => import("@/ui/video-player/VideoPlayer"), {
  ssr: false,
});

const DymanicRating = dynamic(() => import("./RateMovie/RateMovie"), {
  ssr: false,
});

interface ISingleMovie {
  movie: IMovie;
  similarMovies: IGalleryItem[];
}

const SingleMovie: FC<ISingleMovie> = ({ movie, similarMovies }) => {
  useUpdateCountOpened(movie.slug);

  return (
    <Meta title={movie.title} description={`Watch ${movie.title}`}>
      <Banner
        image={movie.bigPoster}
        Detail={() => <Content movie={movie} />}
      />

      <DymanicPlayer slug={movie.slug} videoSource={movie.videoUrl} />

      <div className="mt-12">
        <SubHeading title="Similar" />
        <Gallery items={similarMovies} />
      </div>

      <DymanicRating id={movie._id} slug={movie.slug} />
    </Meta>
  );
};

export default SingleMovie;
