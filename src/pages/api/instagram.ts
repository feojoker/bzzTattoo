import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export async function fetchInstagram() {

  return await cloudinary.search
    .expression('folder:instagram')
    .sort_by('public_id', 'desc')
    .max_results(16)
    .with_field('context')
    .with_field('tags')
    .execute()
    .then(data => data.resources);
};