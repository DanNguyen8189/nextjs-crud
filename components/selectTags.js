// /components/Dropdown.js
//"use client";
import { useState, useEffect } from 'react';

export default function MultiSelectDropdown({ onSelectChange }) {
    const [items, setItems] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/getTags');
        const data = await response.json();
        setItems(data);
    }
    fetchData();
    }, []);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        onSelectChange(event.target.value); //signals parent component that something was selected
        console.log("selected: ", selectedValue)
    };

    return (
    <select value={selectedValue} onChange={handleChange}>
        <option value="" disabled>Select an item</option>
        {items.map((item) => (
        <option key={item.id} value={item.id}>
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