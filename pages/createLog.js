import Form from 'next/form'
 
// export default function Page() {
//   return (
//     <Form action={createPost}>
//       <input name="title" />
//       {/* ... */}
//       <button type="submit">Create Post</button>
//     </Form>
//   )
// }

async function onSubmit(event) {
    event.preventDefault()
    //setIsLoading(true)
    //setError(null) // Clear previous errors when a new request starts
 
    try {
        //const formData = new FormData(event.currentTarget)
        const formData = new FormData(event.currentTarget)
        // formData.append("title", "crash1");

        // below was for testing, if ever need to extract client side
        // const dataArray = [...formData];
        // const data2 = Object.fromEntries(dataArray);
        // console.log(data2.name);
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData,
        })
        //console.log(formData)
        // if (!response.ok) {
        //     throw new Error('Failed to submit the data. Please try again.')
        // } else {
        //     console.log("Success!")
        // }

        // Handle response if necessary
        const data = await response.json()
        console.log(data)
        // ...
    } catch (error) {
        // Capture the error message to display to the user
        //setError(error.message)
        console.error(error)
        } finally {
        //setIsLoading(false)
    }
}

async function onSubmit2(data) {
    console.log(data);

    // const log = await fetch("api/creatLog", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    // })

    /*if (Object.keys(errors).length === 0) {
        router.push("/login"); 
    }
    reset();

    */
}

export default function Page() {
    // return (
    //   <Form action="/api/createLog">
    //     {/* On submission, the input value will be appended to
    //         the URL, e.g. /search?query=abc */}
    //     <input name="query" />
    //     <button type="submit">Submit</button>
    //   </Form>
    // // <p>test</p>
    // ) 
    return (
        // <form onSubmit={onSubmit}>
        //   <input type="text" id="title" name="title" />
        //   <input type="text" id="description" name="description" />
        //   <button type="submit">Submit</button>
        // </form>
        <form onSubmit={onSubmit}>
            <input type="text" name="title" />
            <input type="text" name="description" />
            <button type="submit">Submit</button>
        </form>
    )
}