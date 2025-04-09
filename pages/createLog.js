import Form from 'next/form'
import React, { useState, FormEvent } from 'react'
import MultiSelectDropdown from '../components/selectTags';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    // const [selectedValue, setSelectedValue] = useState('');

    // const handleSelectChange = (value) => {
    //     //from tag selection
    //     setSelectedValue(value);
    //     console.log("selected value from parent pov: ", selectedValue);
    // };
    
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts
    
        //setError(null) // Clear previous errors when a new request starts
     
        try {
            //const formData = new FormData(event.currentTarget)
            const formData = new FormData(event.currentTarget)
            //formData.append("tags[]", selectedValue); // append the fields from the multiselect form
            formData.append("tags", "tag1"); // append the fields from the multiselect form
            formData.append("tags", "tag2");
            //formData.append("tags", selectedValue);
            console.log(formData.getAll("tags")); // Returns ["Chris", "Bob"])
    
            // below was for testing, if ever need to extract client side
            // const dataArray = [...formData];
            // const data2 = Object.fromEntries(dataArray);
            // console.log("data from client side:", data2);

            // for (const value of formData.values()) {
            //     console.log(value);
            //   }
            const response = await fetch('/api/logs', {
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
            setIsLoading(false) // Set loading to false when the request completes  
        }
    }
    
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="title" />
            <input type="text" name="description" />
            {/* <MultiSelectDropdown onSelectChange={handleSelectChange}/> */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
        // <form onSubmit={handleSubmit}>
        //     <MultiSelectDropdown />
        //     <button type="submit">Submit</button>
        // </form>
    )
}