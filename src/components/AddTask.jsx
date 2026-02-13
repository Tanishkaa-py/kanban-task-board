import { useState } from "react";

function AddTask({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    if (!text.trim()) return;

    onAdd(text, priority);
    setText("");
    setPriority("medium");
  };

  return (
    <div className="add-task">
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;