import qs from "qs";

export function getStrapiURL(path: string = ""): string {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}

// /**
//  * Helper to make GET requests to Strapi API endpoints
//  * @param {string} path Path of the API route
//  * @param {Object} urlParamsObject URL params object, will be stringified
//  * @param {Object} options Options passed to fetch
//  * @returns Parsed API call response
//  */
export async function fetchAPI<T>(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);

  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  return fetch(requestUrl, mergedOptions)
    .then(response => {
      if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
      }
      return response.json()
    })
    .then(data => {
      return data.data as T
    })
}