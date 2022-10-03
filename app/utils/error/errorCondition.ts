export const errorCondition = (
  errors: any,
  fieldName: string,
  nestedFieldName?: "country" | "duration" | "year"
) => {
  if (fieldName !== "parameters") {
    return errors[fieldName]?.message
      ? String(errors[fieldName]?.message)
      : undefined;
  }
  return nestedFieldName
    ? errors[fieldName]?.[nestedFieldName]
      ? String(errors[fieldName]?.[nestedFieldName]?.message)
      : undefined
    : undefined;
};
