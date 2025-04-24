import Form from 'next/form'
import React, { useState, FormEvent, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable';

  
export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tags, setTags] = useState([]);

    // creates options for multiselect dropdown component
    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });
    // custom function to create options from tag names pulled from useEffect function
    const createOptionWrapper = ( obj ) => {
        return createOption(obj['name'])
    }

    // look at database to see all tag options
    useEffect(() => {
    async function fetchData() {
        // TODO add a try catch
        const response = await fetch(`/api/tags`, {
            method: 'GET'
        })
        let data = await response.json(); // properly turns response into array
        const data2 = data.map(createOptionWrapper);
        console.log("from useEffect tags:", response);
        setTags(data2);
    }
    fetchData();
    }, []);

    let selected = []

    const setSelected = (newValue) => {
        selected = newValue;
    }
      
    async function onSubmit(event) {
        event.preventDefault()
        setIsSubmitting(true) // Set loading to true when the request starts
    
        //setError(null) // Clear previous errors when a new request starts
     
        try {
            const formData = new FormData(event.currentTarget)
            // formData.append("tags", "tag1"); // append the fields from the multiselect form
            // formData.append("tags", "tag2");
            //console.log("selected length: ", selected.length)
            for (let i = 0; i < selected.length; i++) {
                formData.append("tags", selected[i].value);
            }
            //formData.append("tags", selectedValue);
            console.log("formdata tags: ", formData.getAll("tags")); // Returns ["Chris", "Bob"])
    
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
            setIsSubmitting(false) // Set loading to false when the request completes  
        }
    }
    
    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="title" />
            <input type="text" name="description" />
            <CreatableSelect 
                isMulti 
                isClearable
                onChange={(newValue) => setSelected(newValue)} // the onchange function from react-select component modifies the newValue variable into a list
                options={tags} 
             />
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
        </form>
    )
}