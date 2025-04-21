/**
 * Asynchronously fetches data from a specified URL, optionally including additional request options.
 * This function automatically prepends the server URL to relative paths and can handle responses with
 * status codes below 400 as successful, otherwise it throws an error. It also handles DELETE method
 * requests specifically by returning the entire response object.
 *
 * @param {string} url The endpoint URL to fetch data from. If the URL does not start with 'http', the SERVER_URL is prepended.
 * @param {RequestInit} [options] Optional request initialisation parameters, including method, headers, and body among others.
 * @returns {Promise<{status: number, errors?: {[key: string]: string}, data: {statusCode: number, message: string, data?: {[key: string]: unknown}}, [key: string]: unknown}>} A promise that resolves to an object containing the response status, potential errors, and the data retrieved from the API. The promise may reject with an error message in case of failure.
 */
export default async function fetcher(
  url: string,
  options?: RequestInit
): Promise<{
  status: number;
  errors?: {
    [key: string]: string;
  };
  data: {
    statusCode: number;
    message: string;
    data?: {
      [key: string]: unknown;
    };
  };
  [key: string]: unknown;
}> {
  const staticPath = url;
  // if (!url.startsWith("http")) {
  //   url = SERVER_URL + url;
  // }

  return fetch(url, {
    next: {
      revalidate: 30,
      tags: [staticPath].concat(options?.next?.tags ?? []),
    },
    ...options,
    headers: {
      ...options?.headers,
    },
  })
    .then(async (res) => {
      let data = null;
      let status = null;
      try {
        const response = await res?.json();
        status = response.statusCode;
        if (response.statusCode < 400) {
          data = response?.data || null;
          if (options?.method === "DELETE") {
            data = response;
          }
        }
        // Handle error
        else {
          return {
            status: response.statusCode,
            errors: { message: response.message },
            data: null,
            ok: false,
          };
        }
        if (response.errors) {
          data = {
            ...data,
            errors: response.errors,
          };
        }
      } catch (e) {
        data = null;
      }
      return { ...data, status, ok: res.ok };
    })
    .catch((err) => {
      console.error("Error: ", err);
      return {
        status: 500,
        errors: { message: err.message, err },
        data: null,
        ok: false,
      };
    });
}
