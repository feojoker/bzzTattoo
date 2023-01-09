import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  const mediaUrl = url.startsWith("/") ? getStrapiURL(url) : url;

  return mediaUrl;
}

export function getCloudinaryMedia(media: any) {
  const { resource_type, public_id } = media.data.attributes.provider_metadata;
  // const { url } = media.data.attributes;

  // const mediaUrl = url.replace(`https://res.cloudinary.com/dx2vbnmiz/${resource_type}/upload/`, '');

  // return mediaUrl;
  return public_id;
}