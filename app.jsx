import { useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    const value = inputRef.current.value.trim();
    if (value === '') return;

    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = value;
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, value]);
    }

    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  const handleEdit = (index) => {
    inputRef.current.value = items[index];
    setEditIndex(index);
    inputRef.current.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 id="heading">TO DO LIST</h1>

      <div>
        <input ref={inputRef} type="text" placeholder="Add Item" />
        <br />
        <button id="Add" onClick={handleAdd}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <div id="list">
        {items.map((item, index) => (
          <div className="item" key={index}>
            <span>{item}</span>
            <div className="buttons">
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
