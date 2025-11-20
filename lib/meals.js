import { sql } from '@vercel/postgres';
import { v2 as cloudinary } from 'cloudinary';
import slugify from 'slugify';
import xss from 'xss';

// Cloudinary konfiqurasiyası
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function getMeals() {
  // Postgres-dən məlumatları çəkirik (artıq async olmalıdır)
  const { rows } = await sql`SELECT * FROM meals`;
  return rows;
}

export async function getMeal(slug) {
  const { rows } = await sql`SELECT * FROM meals WHERE slug = ${slug}`;
  return rows[0];
}

export async function saveMealData(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // 1. Şəkli Cloudinary-ə yükləyirik
  const arrayBuffer = await meal.image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const imageData = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { tags: ['nextjs-course-meals'] }, // İstəyə bağlı tag
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    ).end(buffer);
  });

  // 2. Şəklin URL-ni alırıq
  meal.image = imageData.secure_url;

  // 3. Məlumatları Vercel Postgres-ə yazırıq
  await sql`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      ${meal.title},
      ${meal.summary},
      ${meal.instructions},
      ${meal.creator},
      ${meal.creator_email},
      ${meal.image},
      ${meal.slug}
    )
  `;
}

export async function DeleteMeal(slug) {
  await sql`DELETE FROM meals WHERE slug = ${slug}`;
}