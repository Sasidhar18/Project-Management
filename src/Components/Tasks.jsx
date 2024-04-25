import { useRef } from "react";

const Tasks = ({ task, saveTask, projectId, onDeleteTask }) => {
  const newTask = useRef();

  const handleTask = () => {
    const task = {
      title: newTask.current.value,
      projectId,
    };
    newTask.current.value = "";
    saveTask(task);
  };
  return (
    <section className="project-tasks">
      <h2>Tasks</h2>
      <input type="text" ref={newTask} />
      <button onClick={handleTask} className="save-btn">
        Save
      </button>
      {task.length === 0 && (
        <p>Looks like this project doesn't have any task, Create One!</p>
      )}
      {task.length > 0 && (
        <ul>
          {task.map((item) => (
            <li className="task-item" key={item.id}>
              {item.title}
              <button
                onClick={() => onDeleteTask(item.id)}
                className="save-btn"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
