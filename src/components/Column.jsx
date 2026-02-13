import { useDroppable } from "@dnd-kit/core";

function Column({ title, children }) {

  const statusMap = {
    "To Do": "todo",
    "In Progress": "in-progress",
    "Done": "done"
  };

  const { setNodeRef } = useDroppable({
    id: statusMap[title]
  });

  return (
    <div className="column" ref={setNodeRef}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Column;