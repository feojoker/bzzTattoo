import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  const mediaUrl = url.startsWith("/") ? getStrapiURL(url) : url;

  return mediaUrl;
}

export function getCloudinaryMedia(media: any) {
  const { public_id } = media.data.attributes.provider_metadata;

  return public_id;
}