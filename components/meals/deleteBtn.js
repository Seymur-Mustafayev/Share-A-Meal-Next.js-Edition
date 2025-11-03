'use client'; 
import { useFormStatus } from 'react-dom';

export default function DeleteButton({...props}) {
    const { pending } = useFormStatus();

    return (
        <button {...props} type="submit" disabled={pending}>
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    );
}