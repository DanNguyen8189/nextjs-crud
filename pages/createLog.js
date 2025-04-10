import Form from 'next/form'
import React, { useState, FormEvent } from 'react'
import CreatableSelect from 'react-select/creatable';

  
export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    // const defaultOptions = [
    //     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    //     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    //     { value: 'purple', label: 'Purple', color: '#5243AA' },
    //     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    //     { value: 'orange', label: 'Orange', color: '#FF8B00' },
    //     { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    //     { value: 'green', label: 'Green', color: '#36B37E' },
    //     { value: 'forest', label: 'Forest', color: '#00875A' },
    //     { value: 'slate', label: 'Slate', color: '#253858' },
    //     { value: 'silver', label: 'Silver', color: '#666666' },
    //   ];


    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });
    const defaultOptions = [
        createOption('One'),
        createOption('Two'),
        createOption('Three'),
    ];
    const [options, setOptions] = useState(defaultOptions);
    // const [value, setValue] = useState(null);
      
    const handleCreate = (inputValue) => {
        setIsLoading(true);
        setTimeout(() => {
          const newOption = createOption(inputValue);
          setIsLoading(false);
          setOptions((prev) => [...prev, newOption]);
          setValue(newOption);
        }, 1000);
      };
      
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
            <CreatableSelect 
                isMulti 
                // isClearable
                // isDisabled={isLoading}
                // isLoading={isLoading}
                //onChange={(newValue) => setValue(newValue)}
                options={defaultOptions}
                // onCreateOption={handleCreate}
             />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>

    )
}