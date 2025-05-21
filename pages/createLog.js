import Form from 'next/form'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Menu } from '@mantine/core';
import classes from '@styles/createLog.module.css'

  
export default function Page({ onSignal }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const spanRef = useRef(null); // needed to attach span text to formdata (formdata won't pick it up on its own)
    const [opened, { open, close }] = useDisclosure(false); //modal open/close

    // creates options for multiselect dropdown component
    const createOption = (label) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });
    // custom function to create options from tag names pulled from useEffect function
    const createOptionWrapper = ( obj ) => {
        return createOption(obj['name'])
    }

    async function fetchData() {
        // TODO add a try catch
        const response = await fetch(`https://animated-hummingbird-6f6978.netlify.app/api/tags`, {
            method: 'GET'
        })
        console.log(response);
        let data = await response.json(); // properly turns response into array
        const data2 = data.map(createOptionWrapper);
        setTags(data2);
    }

    let selected = []

    const setSelected = (newValue) => {
        selected = newValue;
    }

    // for detecting inpu
    const handleTextChange = (event) => {
        setTitle(event.target.value);
    };
      
    const checkTitle = (str) => {
        return typeof str === 'string' && str.trimStart().length > 0;
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
            if (spanRef.current){
                formData.append("description", spanRef.current.textContent)
            }
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
            sendSignal();
            close();

            // ...
        } catch (error) {
            // Capture the error message to display to the user
            // setError(error.message)
            console.error(error)
        } finally {
            setIsSubmitting(false) // Set loading to false when the request completes  
        }
    }

    const sendSignal = () => {
        onSignal('Hello from child!');
    };
    // look at database to see all tag options
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <Modal opened={opened} onClose={close} size="lg"
            classNames={{
                content: classes.content
            }}>
            <form onSubmit={onSubmit} className={classes.form}>
                <input type="text" name="title" placeholder="Title" className={classes.input} onChange={handleTextChange}/>
                <hr></hr>
                {/* <input type="text" name="description" className={[classes.input, classes.inputDescription].join(" ")}/> */}
                <span ref={spanRef}
                    name ="description"
                    className={[classes.input, classes.inputDescription].join(" ")}
                    contentEditable="true">
                    </span>
                <p>Tags</p>
                <CreatableSelect 
                    isMulti 
                    isClearable
                    onChange={(newValue) => setSelected(newValue)} // the onchange function from react-select component modifies the newValue variable into a list
                    options={tags} 
                />
                <button type="submit" disabled={isSubmitting || !checkTitle(title)} className={classes.button}>
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </Modal>
        {/* <Button variant="default" onClick={open}>
            Create Log
        </Button> */}
        <button className={[classes.button].join(' ')} onClick={open}>
            New Log
        </button>
        </>
    )
}