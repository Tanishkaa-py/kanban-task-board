import { useState, useEffect } from 'react'
import './App.css'
import Column from './components/Column'
import AddTask from './components/AddTask'
import TaskCard from './components/TaskCard'
import { DndContext } from "@dnd-kit/core";

function App() {

  // ✅ Initialize from localStorage directly
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      status: "todo",
      priority
    };
  
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const moveTask = (id, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTask = (id, newText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const taskId = active.id;
    const newStatus = over.id;
  
    moveTask(taskId, newStatus);
  };

  const [search, setSearch] = useState("");

  // ✅ Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ Filter tasks AFTER state is defined
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );
  
  const todoTasks = filteredTasks.filter(task => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
  const doneTasks = filteredTasks.filter(task => task.status === "done");

  return (
    <div className="app">
      <h1>Kanban Task Board</h1>

      <AddTask onAdd={addTask} />

<div className="search-bar">
  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="board">

        <Column title="To Do">
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
              onUpdate={updateTask}
            />
          ))}
        </Column>

        <Column title="In Progress">
          {inProgressTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
              onUpdate={updateTask}
            />
          ))}
        </Column>

        <Column title="Done">
          {doneTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onMove={moveTask}
              onUpdate={updateTask}
            />
          ))}
        </Column>

       </div>
      </DndContext>
    </div>
  )
}

export default App