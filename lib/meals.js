import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';

const db = sql('meals.db')


export function getMeals() {
  return db.prepare('SELECT * FROM meals').all();
}
export async function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
export async function saveMealData(meal) {
  meal.slug = slugify(meal.title, { lower: true })
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}-${Math.random().toString(36).substring(2, 8)}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Dont  post Image on server.');
    }
  });

  meal.image = `/images/${fileName}`;

  db.prepare(`
        INSERT INTO meals 
            (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}

export function DeleteMeal(slug){
  const stmt = db.prepare('DELETE FROM meals WHERE slug = ?'); 
    
    
    stmt.run(slug);
}