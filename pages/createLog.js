import Form from 'next/form'
import React, { useState, FormEvent, useEffect, useRef } from 'react'
import CreatableSelect from 'react-select/creatable';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import classes from '@styles/createLog.module.css'

  
export default function Page() {
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

    // for detecting inpu
    const handleTextChange = (event) => {
        setTitle(event.target.value);
    };
      
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
            close();

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
        <>
        <Modal opened={opened} onClose={close} size="lg"
            classNames={{
                content: classes.content
            }}>
            <form onSubmit={onSubmit}>
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
                <button type="submit" disabled={isSubmitting || !title} className={classes.button}>
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </Modal>
        {/* <Button variant="default" onClick={open}>
            Create Log
        </Button> */}
        <button className={classes.button} onClick={open}>
            Create Log
        </button>

        {/* https://www.sliderrevolution.com/resources/css-modal/ */}
{/* <div class="box">
  <a href="#m1-o" class="link-1" id="m1-c">Modal 1</a>

  <div class="modal-container" id="m1-o" style={{ background: "transparent"}}>
    <div class="modal">
      <h1 class="modal__title">Modal 1 Title</h1>
      <p class="modal__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex dicta maiores libero minus obcaecati iste optio, eius labore repellendus.</p>
      <button class="modal__btn">Button &rarr;</button>
      <a href="#m1-c" class="link-2"></a>
    </div>
  </div>
</div> */}
        </>
    )
}