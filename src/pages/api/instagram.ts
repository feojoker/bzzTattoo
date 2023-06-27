// export async function fetchInstagram() {

//   const requestUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`

//   return fetch(requestUrl)
//     .then(response => {
//       if (!response.ok) {
//         console.error(response.statusText);
//         throw new Error(`Failed to load instagram media`);
//       }
//       return response.json()
//     })
//     .then(data => data)
// };


export async function fetchInstagram() {

  const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:3010"}` + `/api/instagram/images`;

  return fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        console.error(`Failed to load instagram media`);
        throw new Error(`Failed to load instagram media`);
      }
      return response.json()
    })
    .then(data => data)
};