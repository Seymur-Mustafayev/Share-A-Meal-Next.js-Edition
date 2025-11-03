'use client'
import { useFormState } from "react-dom"

export default function ShareButton() {
    const { pending } = useFormState()
    return (
        <>

            <button disabled={pending} type="submit">{pending ? "Sending....." : "Share Meal"}</button>

        </>)
}
