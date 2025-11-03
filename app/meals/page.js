import Mealsgrind from "@/components/meals/meals-grind"
import { getMeals } from "@/lib/meals"
import classes from './page.module.css'
import Link from "next/link"
import { Suspense } from "react"



export function generateMetadata(){
 return{
   title:'Meals',
   description:'All meals fetching  this page'

 }
}

 async function  Meals(){
   const meals = await getMeals()
   return <Mealsgrind meals={meals} />
}
export default function MealsPage() {

   return (
      <>
         <header className={classes.header}>
            <h1>
               Delicious meals, created{''}
            </h1>
            <p>
               Choose  your favorite recipe and  cook it yourself. It  is easy and fun!
            </p>
            <p className={classes.cta}>
               <Link href={'/meals/share'}>Share Your Favorite  Recipe</Link>
            </p>
         </header>
         <main>
           <Suspense fallback={<p className={classes.loading}>Fetching Meals......</p>}>
            <Meals/>
           </Suspense>
         </main>


      </>
   )
}