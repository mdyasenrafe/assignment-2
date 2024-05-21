import { ZodError } from "zod";

export const formatZodError = (error: ZodError): string => {
  const errorMessages = error.issues
    .map((issue) => {
      const path = issue.path.join(".");
      return `Field '${path}' ${issue.message}`;
    })
    .join(", ");

  return `Validation failed: ${errorMessages}`;
};
