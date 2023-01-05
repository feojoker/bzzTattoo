import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;

  return imageUrl;
}

export function getCloudinaryMedia(media: any) {
  const { url } = media.data.attributes;
  const imageUrl = url.replace('https://res.cloudinary.com/dx2vbnmiz/image/upload', '');

  return imageUrl;
}