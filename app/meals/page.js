import Mealsgrind from "@/components/meals/meals-grind";
import { getMeals } from "@/lib/meals";
import classes from './page.module.css';
import Link from "next/link";
import { Suspense } from "react";

// --- 1. ASYNC KOMPONENT YUXARI SƏVİYYƏYƏ ÇIXARILDI ---
// Məlumatı çəkən async komponent faylın yuxarı səviyyəsində olmalıdır.
async function Meals() {
    const meals = await getMeals();
    return <Mealsgrind meals={meals} />;
}
// --------------------------------------------------------

export function generateMetadata() {
    return {
        title: 'Meals',
        description: 'All meals fetching this page'
    };
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created
                    {/* Artıq {''} sintaksisi silinib */}
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href={'/meals/share'}>Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main>
                {/* 2. Suspense daxilində Meals komponentini çağırırıq */}
                <Suspense fallback={<p className={classes.loading}>Fetching Meals......</p>}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}