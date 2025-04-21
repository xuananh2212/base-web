import _ from "lodash";

/**
 * Filters an object by removing properties with falsy values.
 *
 * This function iterates over each property of the provided object. If a property's value is falsy (e.g., `false`, `0`, `""`, `null`, `undefined`, or `NaN`),
 * that property is omitted from the returned object. Properties with truthy values are retained.
 *
 * @param obj - The object to filter. It must be an object that extends `Record<string, any>`, meaning its keys are strings and its values can be of any type.
 * @returns A new object of type `Partial<T>`. This object includes only the properties of the input object that have truthy values.
 *          The returned object is a partial representation of the input object, potentially containing fewer properties.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the shape of the input object.
 */
export function filterObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const filter = (currentObj: any): any => {
    if (Array.isArray(currentObj)) {
      // Filter each item in the array recursively and remove nullish items or objects with all keys nullish
      return currentObj
        .map((item) => filter(item))
        .filter((item) => {
          if (typeof item === "object" && !Array.isArray(item)) {
            return Object.keys(item).length > 0; // Keep if the object has at least one key
          }
          return item !== null && item !== undefined && item !== ""; // Keep if the item is not nullish or empty string
        });
    } else if (typeof currentObj === "object" && currentObj !== null) {
      const filteredObj: Record<string, any> = {};
      Object.entries(currentObj).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined && typeof value === "object") {
          const deepFilteredObj = filter(value);
          if (Array.isArray(value) || Object.keys(deepFilteredObj).length > 0) {
            filteredObj[key] = deepFilteredObj;
          }
        } else if (value !== null && value !== undefined && value !== "") {
          filteredObj[key] = value;
        }
      });
      return filteredObj;
    }
    return currentObj;
  };

  return filter(obj);
}

/**
 * Removes keys from an object if their corresponding *Id keys exist and filters out falsy values, with exceptions.
 *
 * @param obj - The object to filter and clean.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`.
 */
export function removeObjectWithId<T extends Record<string, any>>(obj: T, exception: string[] = []): Partial<T> {
  const filteredObj = filterObject(obj);

  const keysToRemove = new Set<string>();
  const keysWithId = Object.keys(filteredObj).filter(
    (key) => key.endsWith("Id") && !exception.includes(key) && !exception.includes(key.replace("Id", ""))
  );
  keysWithId.forEach((keyWithId) => {
    const originalKey = keyWithId.replace("Id", "");
    if (!exception.includes(originalKey) && Object.prototype.hasOwnProperty.call(filteredObj, originalKey)) {
      keysToRemove.add(originalKey);
    }
  });

  const finalFilteredObj: Partial<T> = {};
  Object.entries(filteredObj).forEach(([key, value]) => {
    if (!keysToRemove.has(key)) {
      finalFilteredObj[key as keyof T] = value;
    }
  });

  exception.forEach((key) => {
    if (key.endsWith("Id") && filteredObj[key]) {
      const baseKey = key.replace("Id", "");
      finalFilteredObj[baseKey as keyof T] = filteredObj[key];
    }
  });

  return finalFilteredObj;
}

/**
 * Removes keys from an object if their corresponding keys without the "Id" suffix exist and filters out falsy values, with exceptions.
 *
 * @param obj - The object to filter and clean.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`.
 */
export function removeObjectWithKey<T extends Record<string, any>>(obj: T, exception: string[] = []): Partial<T> {
  const filteredObj = filterObject(obj);

  const finalFilteredObj: Partial<T> = {};
  Object.keys(filteredObj).forEach((key) => {
    const baseKey = key.endsWith("Id") ? key.slice(0, -2) : key;
    if (!exception.includes(baseKey)) {
      finalFilteredObj[key as keyof T] = filteredObj[key];
    } else if (key.endsWith("Id") && exception.includes(baseKey)) {
      finalFilteredObj[baseKey as keyof T] = filteredObj[key];
    }
  });

  return finalFilteredObj;
}

/**
 * Modifies an object for search parameters by handling date range fields specifically.
 * If only one of `startDate` or `endDate` is provided, it combines them into a single `date` field.
 * This is particularly useful for search parameters where a single date field is required even if only one end of the range is specified.
 * Additionally, it retains the behavior of removing keys with corresponding *Id keys and filtering out falsy values.
 *
 * @param obj - The object to modify for search parameters. It extends `Record<string, any>`.
 * @param exception - An array of keys to exclude from the removal process.
 * @returns A new object of type `Partial<T>`. For search parameters, if only `startDate` or `endDate` is present, they are combined into a single `date` field.
 *          Also applies the logic of `removeObjectWithId` to filter out keys with corresponding *Id keys and falsy values.
 *
 * @template T - A generic type extending `Record<string, any>`, representing the shape of the input object.
 */
export function modifyDateForSearch<T extends Record<string, any>>(
  obj: T,
  exception: string[] = []
): Partial<T> & {
  date?: string;
  startDate?: string;
  endDate?: string;
} {
  let modifiedObj: Partial<T> & {
    date?: string;
    startDate?: string;
    endDate?: string;
  } = removeObjectWithKey(obj, exception);

  const hasStartDate = "startDate" in modifiedObj;
  const hasEndDate = "endDate" in modifiedObj;

  // If only startDate is provided
  if (hasStartDate && !hasEndDate) {
    modifiedObj.date = modifiedObj.startDate;
    delete modifiedObj.startDate;
  }
  // If only endDate is provided
  else if (!hasStartDate && hasEndDate) {
    modifiedObj.date = modifiedObj.endDate;
    delete modifiedObj.endDate;
  }

  return modifiedObj;
}

export function isEmptyObject(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0;
}

export function filterObjectNullAndEmptyString(obj: any): any {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    const filteredArray = obj
      .map(filterObjectNullAndEmptyString)
      .filter(
        (item) => item !== null && item !== undefined && (typeof item !== "object" || Object.keys(item).length > 0)
      );
    return filteredArray.length > 0 ? filteredArray : null;
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const filteredValue = filterObjectNullAndEmptyString(value);
    if (
      filteredValue !== "" &&
      filteredValue !== null &&
      (typeof filteredValue !== "object" || Object.keys(filteredValue).length > 0)
    ) {
      result[key] = filteredValue;
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

export function replaceEmptyStringsWithNull(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(replaceEmptyStringsWithNull);
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === "") {
      result[key] = null;
    } else if (typeof value === "object") {
      result[key] = replaceEmptyStringsWithNull(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

// Utility function to get a nested object using a path
const getNestedObject = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

// Utility function to set a nested object using a path
const setNestedObject = (obj: any, path: string, value: any): void => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  if (lastKey === undefined) {
    throw new Error("Invalid path provided");
  }
  const lastObj = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
  lastObj[lastKey] = value;
};

export function filterObjectWithTypes<T extends Record<string, any>>(
  obj: T,
  typesToFilter: any[], // Array of types to filter out
  targetPaths: string[] = [] // Optional array of paths to the target objects
): Partial<T> {
  const filter = (currentObj: any): any => {
    if (Array.isArray(currentObj)) {
      return currentObj
        .map((item) => filter(item))
        .filter((item) => {
          if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            return Object.keys(item).length > 0;
          }
          return !typesToFilter.includes(item);
        });
    } else if (typeof currentObj === "object" && currentObj !== null) {
      const filteredObj: Record<string, any> = {};
      Object.entries(currentObj).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          const deepFilteredObj = filter(value);
          if (Array.isArray(value) || Object.keys(deepFilteredObj).length > 0) {
            filteredObj[key] = deepFilteredObj;
          }
        } else if (!typesToFilter.includes(value)) {
          filteredObj[key] = value;
        }
      });
      return filteredObj;
    }
    return currentObj;
  };

  const applyFilterToPaths = (obj: T, paths: string[]): Partial<T> => {
    paths.forEach((path) => {
      const targetObject = getNestedObject(obj, path);
      if (targetObject) {
        const filteredTargetObject = filter(targetObject);
        setNestedObject(obj, path, filteredTargetObject);
        const targetArray = getNestedObject(obj, path);
        if (
          Array.isArray(targetArray) &&
          targetArray.every((item) => typeof item === "object" && Object.keys(item).length === 0)
        ) {
          setNestedObject(obj, path, []);
        }
      }
    });
    return obj;
  };

  if (targetPaths.length > 0) {
    return applyFilterToPaths(obj, targetPaths);
  } else {
    return filter(obj);
  }
}

export function deepTrimObject(obj: any): any {
  // Base case: if obj is a string, trim it
  if (_.isString(obj)) {
    return _.trim(obj);
  }

  // If obj is a Date, return it as is
  if (_.isDate(obj)) {
    return obj;
  }

  // If obj is an array, map over the array elements and apply deepTrimObject recursively
  if (_.isArray(obj)) {
    return obj.map((value) => deepTrimObject(value));
  }

  // If obj is an object (but not an array), map its values recursively
  if (_.isObject(obj)) {
    return _.mapValues(obj, (value) => deepTrimObject(value));
  }

  // For non-object, non-array, non-string, and non-date values, return as is
  return obj;
}
