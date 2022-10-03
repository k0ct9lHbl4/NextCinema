import dynamic from "next/dynamic";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import SkeletonLoader from "@/ui/SkeletonLoader";
import AdminNavigation from "@/ui/admin-navigation/AdminNavigation";
import Button from "@/ui/form-elements/Button";
import Field from "@/ui/form-elements/Field";
import SlugField from "@/ui/form-elements/SlugField/SlugField";
import UploadField from "@/ui/form-elements/UploadField/UploadField";
import formStyles from "@/ui/form-elements/admin-form.module.scss";
import Heading from "@/ui/heading/Heading";

import { errorCondition } from "@/utils/error/errorCondition";
import Meta from "@/utils/meta/Meta";
import { generateSlug } from "@/utils/string/generateSlug";

import { IMovieEditInput } from "./movie-edit.interface";
import { useAdminActors } from "./useAdminActors";
import { useAdminGenres } from "./useAdminGenres";
import { useMovieEdit } from "./useMovieEdit";

const DynamicSelect = dynamic(() => import("@/ui/select/Select"), {
  ssr: false,
});

const MovieEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IMovieEditInput>({
    mode: "onChange",
  });

  const { onSubmit, isLoading } = useMovieEdit(setValue);

  const { isLoading: isGenresLoading, data: genres } = useAdminGenres();
  const { isLoading: isActorsLoading, data: actors } = useAdminActors();

  return (
    <Meta title="Edit movie">
      <AdminNavigation />
      <Heading title="Edit movie" />

      {isLoading ? (
        <SkeletonLoader count={3} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
          <div className={formStyles.fields}>
            <Field
              {...register("title", {
                required: "Title is required!",
              })}
              placeholder="Title"
              error={errorCondition(errors, "title")}
            />

            <SlugField
              register={register}
              error={errorCondition(errors, "slug")}
              generate={() => {
                setValue("slug", generateSlug(getValues("title")));
              }}
            />

            <Field
              {...register("parameters.country", {
                required: "Country is required!",
              })}
              placeholder="Country"
              error={errorCondition(errors, "parameters", "country")}
              style={{ width: "31%" }}
            />

            <Field
              {...register("parameters.duration", {
                required: "Duration is required!",
              })}
              placeholder="Duration"
              error={errorCondition(errors, "parameters", "duration")}
              style={{ width: "31%" }}
            />

            <Field
              {...register("parameters.year", {
                required: "Year is required!",
              })}
              placeholder="Year"
              error={errorCondition(errors, "parameters", "year")}
              style={{ width: "31%" }}
            />

            <Controller
              name="genres"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  options={genres || []}
                  isLoading={isGenresLoading}
                  isMulti
                  placeholder="Genres"
                  error={error?.message}
                />
              )}
              rules={{
                required: "Please select at least one genre!",
              }}
            />

            <Controller
              name="actors"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicSelect
                  field={field}
                  options={actors || []}
                  isLoading={isActorsLoading}
                  isMulti
                  placeholder="Actors"
                  error={error?.message}
                />
              )}
              rules={{
                required: "Please select at least one actor!",
              }}
            />

            <Controller
              name="poster"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  placeholder="Poster"
                  error={error}
                  folder="movies"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: "Poster is required!",
              }}
            />

            <Controller
              name="bigPoster"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  placeholder="bigPoster"
                  error={error}
                  folder="movies"
                  value={value}
                  onChange={onChange}
                />
              )}
              rules={{
                required: "Big poster is required!",
              }}
            />

            <Controller
              name="videoUrl"
              control={control}
              defaultValue=""
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <UploadField
                  placeholder="Video"
                  error={error}
                  folder="movies"
                  value={value}
                  onChange={onChange}
                  style={{ marginTop: -25 }}
                  isNoImage
                />
              )}
              rules={{
                required: "Video is required!",
              }}
            />
          </div>
          <Button>Update</Button>
        </form>
      )}
    </Meta>
  );
};

export default MovieEdit;
