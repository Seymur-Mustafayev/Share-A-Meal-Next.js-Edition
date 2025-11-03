import MealItem from "./meal-item"
import classes from '@/components/meals/meals-grind.module.css'
export default function Mealsgrind({ meals }) {
  return (
    <>

      <ul className={classes.meals}>
        {meals.map((meal) => {

          return <li key={meal.slug}><MealItem {...meal} /></li>
        })}
      </ul>

    </>)
}
