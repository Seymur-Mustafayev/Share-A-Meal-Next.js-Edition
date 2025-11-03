
import { getMeal } from "@/lib/meals"
import classes from './page.module.css'
import Image from "next/image"
import { notFound } from "next/navigation";
import DeleteButton from "@/components/meals/deleteBtn";
import { DeleteAction } from "@/lib/actions";
export async function generateMetadata({ params }) {

  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound()
  }

  return {
    title: meal.title,
    description: meal.summary
  };
}



export default async function MealsDetail({ params }) {



  const value = params.mealSlug
  const meal = await getMeal(value)
  if (!meal) {
    notFound()
  }
  const instructions = meal.instructions.replace(/\n/g, '<br />');


  console.log(meal);

  return (

    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
          <form className={classes.shareForm} action={DeleteAction}>
          <input
            type="hidden"
            name="mealSlug"
            value={meal.slug}
          />

         <DeleteButton className={classes.shareButton}/>
        </form>
        </div>
    
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: instructions }}></p>
      </main>

    </>)
}
