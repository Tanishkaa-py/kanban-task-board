import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, onDelete, onMove, onUpdate }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        borderLeft: `5px solid ${
          task.priority === "high"
            ? "red"
            : task.priority === "medium"
            ? "orange"
            : "green"
        }`
      }}
      className="task-card"
    >

      <div
        {...listeners}
        {...attributes}
        style={{ cursor: "grab", marginBottom: "6px" }}
      >
        ⠿ Drag
      </div>

      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={(e) => {
            e.stopPropagation();
            onUpdate(task.id, editedText);
            setIsEditing(false);
          }}>
            Save
          </button>
        </>
      ) : (
        <p onClick={() => setIsEditing(true)}>
          {task.text}
        </p>
      )}

      <div className="task-buttons">
        {task.status !== "todo" && (
          <button onClick={(e) => {
            e.stopPropagation();
            onMove(task.id, "todo");
          }}>
            Move to To Do
          </button>
        )}

        {task.status !== "in-progress" && (
          <button onClick={(e) => {
            e.stopPropagation();
            onMove(task.id, "in-progress");
          }}>
            Move to In Progress
          </button>
        )}

        {task.status !== "done" && (
          <button onClick={(e) => {
            e.stopPropagation();
            onMove(task.id, "done");
          }}>
            Move to Done
          </button>
        )}

        <button onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}>
          ❌
        </button>
      </div>
    </div>
  );
}
export default TaskCard;