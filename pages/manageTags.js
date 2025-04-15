import React, { useState, FormEvent } from 'react'

export async function getStaticProps(){
    const tags = await prisma.Tag.findMany();
    // server expects full urls. https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
    // const tags = await fetch('http://localhost:3000/api/tags', {
    //     method: 'GET',
    // })
    // const tagsjson = tags.json()
    return {
        props: { tags },
    };
};

export default function Page({tags}) {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteTag(id){
        try {
            const response = await fetch(`/api/tags/${id}`, {
                method: 'DELETE'
            })

            const data = await response.json()
            console.log(data)
        } catch (e){
            console.error("client side error: ", e)
        }
    }

    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts
     
        try {
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/api/tags', {
                method: 'POST',
                body: formData,
            })
    
            // Handle response if necessary
            const data = await response.json()
            console.log(data)
            // ...
        } catch (e) {
            // Capture the error message to display to the user
            //setError(error.message)
            console.error(e)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes  
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            <ul className="space-y-2">
            {tags.length > 0 ? (
                tags.map(tag => (
                <li key={tag.id} className="p-4 border rounded shadow-sm">
                    <p>{tag.name}</p>
                    {/* https://stackoverflow.com/questions/34226076/why-is-my-onclick-being-called-on-render-react-js */}
                    <button onClick={ () => deleteTag(tag.id) }>x</button>
                </li>
                ))
            ) : (
                <p>You haven't created any tags yet!</p>
            )}
            </ul>
      </div>
    )
}