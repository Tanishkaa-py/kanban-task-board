import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

function TaskCard({ task, onDelete, onMove, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (!editedText.trim()) return;
    onUpdate(task.id, editedText);
    setIsEditing(false);
  };

  const getBorderColor = () => {
    if (task.priority === "high") return "red";
    if (task.priority === "medium") return "orange";
    if (task.priority === "low") return "green";
    return "gray";
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  });
  
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        ...style,
        borderLeft: `5px solid ${getBorderColor()}`
      }}
      className="task-card"
    >
      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <p onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          {task.text}
        </p>
      )}
  
      <div className="task-buttons">
        {task.status !== "todo" && (
          <button onClick={() => onMove(task.id, "todo")}>
            Move to To Do
          </button>
        )}
  
        {task.status !== "in-progress" && (
          <button onClick={() => onMove(task.id, "in-progress")}>
            Move to In Progress
          </button>
        )}
  
        {task.status !== "done" && (
          <button onClick={() => onMove(task.id, "done")}>
            Move to Done
          </button>
        )}
  
        <button onClick={() => onDelete(task.id)}>❌</button>
      </div>
    </div>
  );}

export default TaskCard;