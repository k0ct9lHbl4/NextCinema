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

import Meta from "@/utils/meta/Meta";
import { generateSlug } from "@/utils/string/generateSlug";

import { IActorEditInput } from "./actor-edit.interface";
import { useActorEdit } from "./useActorEdit";

const ActorEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<IActorEditInput>({
    mode: "onChange",
  });

  const { isLoading, onSubmit } = useActorEdit(setValue);

  const errorCondition = (fieldName: "name" | "slug") =>
    errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined;

  return (
    <Meta title="Edit actor">
      <AdminNavigation />
      <Heading title="Edit actor" />
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                {...register("name", {
                  required: "Name is required!",
                })}
                placeholder="Name"
                error={errorCondition("name")}
              />

              <SlugField
                register={register}
                error={errorCondition("slug")}
                generate={() => {
                  setValue("slug", generateSlug(getValues("name")));
                }}
              />

              <Controller
                name="photo"
                control={control}
                defaultValue=""
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <UploadField
                    placeholder="Photo"
                    error={error}
                    folder="actors"
                    value={value}
                    onChange={onChange}
                  />
                )}
                rules={{
                  required: "Photo is required!",
                }}
              />
            </div>
            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default ActorEdit;
