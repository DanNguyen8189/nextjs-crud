// /components/Dropdown.js
//"use client";
import { useState, useEffect } from 'react';

export default function MultiSelectDropdown({ onSelectChange }) {
    const [items, setItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    // look at database to see all tag options
    useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/getTags');
        const data = await response.json();
        setItems(data);
    }
    fetchData();
    }, []);

    const handleChange = (event) => {
        console.log("onchange activated: ", event.target.value);
        console.log("selected from selectTag component pov: ", selectedValue)
        setSelectedValue(event.target.value);
        onSelectChange(event.target.value); //signals parent component that something was selected
    
    };

    return (
    <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>Select an item</option>
        {items.map((item) => (
        <option key={item.id} value={item.name}>
            {item.name}
        </option>
        ))}
    </select>
    );
}

// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';

// function MultiSelectDropdown() {
//     const [options, setOptions] = useState([]);
//     const [selectedOptions, setSelectedOptions] = useState([]);

//     useEffect(() => {
//         async function loadOptions() {
//         //const data = await getOptions();
//         const response = await fetch('/api/getTags');
//         const data = await response.json();
//         setOptions(data);
//         setOptions(data.map(item => ({ value: item.id, label: item.name })));
//         }
//         loadOptions();
//     }, []);

//     const handleSelectChange = (selected) => {
//         setSelectedOptions(selected);
//         console.log("selected: ", selected)
//     };

//     return (
//         <Select
//             isMulti
//             name="select-options"
//             options={options}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={handleSelectChange}
//         />
//     );
// }

//export default MultiSelectDropdown;