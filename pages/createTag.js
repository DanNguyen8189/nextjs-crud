import React, { useState, FormEvent } from 'react'

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts
     
        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/createTag', {
                method: 'POST',
                body: formData,
            })
    
            // Handle response if necessary
            const data = await response.json()
            console.log(data)
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            //setError(error.message)
            console.error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes  
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    )
}