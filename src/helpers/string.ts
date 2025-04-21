/**
 * Function to remove Vietnamese accents from a string
 * @function
 * @param {string} str - The string from which to remove accents
 * @returns {string} - The string after removing accents
 */
export function removeAccents(str: string) {
  if (!str) {
    return "";
  }
  return str
    .normalize("NFD") // Normalize the string to Unicode Normalization Form D (NFD)
    .replace(/[\u0300-\u036f]/g, "") // Remove all combining diacritical marks
    .replace("đ", "d") // Replace specific Vietnamese characters with their non-accented counterparts
    .replace("Đ", "D"); // Replace specific Vietnamese characters with their non-accented counterparts
}

/**
 * Function to create a slug from a string
 * @function
 * @param {string} str - The string from which to create a slug
 * @param {string|number} id - Id which will be added to the end of the slug
 * @returns {string} - The slug created from the input string
 */
export function slug(str: string, id?: string | number) {
  str = removeAccents(str);
  str = str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  if (id) {
    str += `~${id}`;
  }
  return str;
}

/**
 * Clones an object or array.
 * @param {any} any - the value to clone
 * @returns {object} a clone of the input value
 */
export function cloneObj<T>(any: T): T {
  if (typeof any === "object") {
    return JSON.parse(JSON.stringify(any));
  }
  return any;
}

/**
 * Parse JSON value to object.
 * @param {string} obj - the value to parse
 * @returns {object | null}  Object parsed or null
 */
export function parseObj(obj: string): object | null {
  let result: object | null;
  try {
    result = JSON.parse(obj);
  } catch {
    result = null;
  }
  return result;
}

/**
 * Converts a time string into seconds.
 * This function takes a string representing a time duration and converts it into the total number of seconds.
 * The input string must specify the number followed by a time unit (e.g., "10 minutes").
 * Supported time units are seconds, minutes, hours, days, months, and years.
 * Note: Months are approximated to 30 days and years to 365 days for conversion.
 *
 * @param {string} time - The time duration string to be converted. The string should include a number followed by a time unit.
 * @returns {number} The total number of seconds representing the input time duration.
 * @throws {Error} Throws an error if the input string format is invalid or if an unsupported time unit is provided.
 */

/**
 * Formats a phone number by removing all non-numeric characters except the plus sign, and replaces the country code +84 with 0.
 * This function is specifically designed for Vietnamese phone numbers but can be adapted for other formats.
 *
 * @param {string} phone - The phone number to be formatted.
 * @returns {string} - The formatted phone number with non-numeric characters removed and the country code +84 replaced with 0.
 */
export function formatPhone(phone: string): string {
  let cleanPhone = phone.replace(/[^\d+]/g, "");
  cleanPhone = cleanPhone.replace(/^\+84/, "0");
  return cleanPhone;
}

/**
 * Normalizes a string for search operations by removing accents, converting to lowercase, and trimming whitespace.
 * This function is particularly useful for preparing strings for comparison or inclusion checks in a way that is insensitive to case, accents, or leading/trailing whitespace.
 *
 * @param {string} value - The string to be normalized for search.
 * @returns {string} - The normalized string, with accents removed, converted to lowercase, and trimmed of leading and trailing whitespace.
 */
export function makeSearchValue(value: string): string {
  return removeAccents(value.toLowerCase().trim());
}
/**
 * Checks if a parent string includes a search string after normalizing both strings.
 * This function is useful for performing case-insensitive and accent-insensitive searches.
 *
 * @param {string} parentString - The string to search within.
 * @param {string} searchString - The string to search for.
 * @returns {boolean} - Returns `true` if the normalized `searchString` is found within the normalized `parentString`, otherwise returns `false`.
 */
export function includeSearch(parentString: string, searchString: string): boolean {
  return makeSearchValue(parentString).includes(makeSearchValue(searchString));
}
