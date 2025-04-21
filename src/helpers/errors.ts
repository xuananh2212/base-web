import { extractErrorMessage } from "./responseError";

const findMessageError = (errorResponse: any) => {
  let messages = [];

  // Check if the errorResponse contains errors field
  if (errorResponse && errorResponse.errors) {
    const { errors } = errorResponse;

    // Iterate through each field and its errors
    Object.keys(errors).forEach((field) => {
      const fieldErrors = errors[field];
      fieldErrors.forEach((errorMessage: string) => {
        messages.push(extractErrorMessage(errorMessage));
      });
    });
  } else if (errorResponse && errorResponse.title) {
    // If errors field is not available, just push the title
    messages.push(errorResponse.title);
  }

  return messages?.[0];
};

export { findMessageError };
