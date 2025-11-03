'use server'
import { saveMealData } from "./meals";
import { redirect } from "next/navigation"
import { DeleteMeal } from "./meals";
function isInvalidText(data){
 return !data || data.trim()===''

}

 export async function MealData(prevState,formData){
    
    
    const mealData = {
      
      
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator:formData.get('name'),
      creator_email:formData.get('email')
    };
    
    if (
      isInvalidText(mealData.title) ||
      isInvalidText(mealData.summary) ||
      isInvalidText(mealData.instructions) ||
      isInvalidText(mealData.creator) ||
      isInvalidText(mealData.creator_email) ||
      !mealData.image || mealData.image.size === 0
  ) {
    return { 
      message: 'Fill all the area' 
  };
  }


    await saveMealData(mealData)

    return redirect('/meals')

  }


  export async function DeleteAction(formData) {
    
  
    const slug = formData.get('mealSlug'); 

    await DeleteMeal(slug); 

    redirect('/meals'); 
}