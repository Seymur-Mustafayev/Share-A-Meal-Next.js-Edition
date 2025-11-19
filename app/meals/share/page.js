'use client'

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { MealData } from '@/lib/actions';
import ShareButton from '@/components/meals/share-button';
import { useFormState } from 'react-dom';

const initialState = { message: null };

export default function ShareMealPage() {
  const [state, formAction] = useFormState(MealData, initialState);

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>

      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          {/* inputs */}
          <ImagePicker label="Your Image" name='image' />

          {state.message && <p className="error-message">{state.message}</p>}

          <p className={classes.actions}>
            <ShareButton/>
          </p>
        </form>
      </main>
    </>
  );
}
