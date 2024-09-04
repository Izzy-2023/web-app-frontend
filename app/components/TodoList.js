// app/components/TodoList.js
import { useState } from 'react';

const TodoList = () => {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            setItems([...items, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div>
            <h2>To-Do List</h2>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new item"
            />
            <button onClick={handleAddItem}>Add</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
