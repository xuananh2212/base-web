/**
 * Extracts the error code from an error message string.
 * @param {string} errorMessage - The error message containing the error code.
 * @return {string} - The extracted error code, or an empty string if no code is found.
 */
function extractErrorCode(errorMessage: string): string {
  const regex = /\bVM\d{4}\b/; // Regular expression to find error code in the format "VMxxxx"
  const match = errorMessage.match(regex); // Find the error code in the error message

  return match ? match[0] : ""; // Return the error code if found, otherwise return an empty string
}

/**
 * Extracts the error message from an error message string.
 * @param {string} errorMessage - The error message containing the error text.
 * @return {string} - The extracted error message.
 */
function extractErrorMessage(errorMessage: string): string {
  const regex = /\(VM\d{4}\)\s*/; // Regular expression to find the error code in the format "(VMxxxx)" and an optional space
  return errorMessage.replace(regex, "").trim(); // Remove the error code and optional space, then trim whitespace
}

export { extractErrorCode, extractErrorMessage };
