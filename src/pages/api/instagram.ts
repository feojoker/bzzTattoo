export async function fetchInstagram() {

  const requestUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,permalink&access_token=${process.env.INSTAGRAM_KEY}`

  return fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`Failed to load instagram media`);
      }
      return response.json()
    })
    .then(data => data)
};