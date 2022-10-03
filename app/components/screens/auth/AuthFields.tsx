import { FormState, UseFormRegister } from "react-hook-form";

import Field from "@/ui/form-elements/Field";

import { validEmail } from "@/shared/regex";

interface IAuthFields {
  register: UseFormRegister<any>;
  formState: FormState<any>;
  isPasswordRequired?: boolean;
}

const AuthFields: React.FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  const errorCondition = (fieldName: string) =>
    errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined;

  return (
    <>
      <Field
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: validEmail,
            message: "Please enter a valid email address",
          },
        })}
        placeholder="E-mail"
        error={errorCondition("email")}
      />
      <Field
        {...register(
          "password",
          isPasswordRequired
            ? {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min length should more 6 symbols",
                },
              }
            : {}
        )}
        placeholder="Password"
        type="password"
        error={errorCondition("password")}
      />
    </>
  );
};

export default AuthFields;
