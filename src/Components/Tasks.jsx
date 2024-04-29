import { useContext, useRef } from "react";
import { ProjectContext } from "../Store/project-context-provider";

const Tasks = ({ projectId }) => {
  const newTask = useRef();
  const { task, projectStatus, addTask, deleteTask, completeTask } =
    useContext(ProjectContext);

  const currentTask = task.filter((task) => task.projectId === projectStatus);

  const handleTask = () => {
    const task = {
      title: newTask.current.value,
      completed: false,
      projectId,
    };
    newTask.current.value = "";
    addTask(task);
  };

  return (
    <section className="project-tasks">
      <h2>Tasks</h2>
      <input type="text" ref={newTask} />
      <button onClick={handleTask} className="save-btn">
        Save
      </button>
      {currentTask.length === 0 && (
        <p>Looks like this project doesn't have any task, Create One!</p>
      )}
      {currentTask.length > 0 && (
        <ul>
          {currentTask.map((item, index) => (
            <li className="task-item" key={item.id}>
              {console.log(item.id)}
              <div className="checkbox-wrapper-52">
                <label htmlFor={`todo-${index}`} className="item">
                  <input
                    type="checkbox"
                    onChange={() => completeTask(item)}
                    id={`todo-${index}`}
                    className={item.completed ? "hidden active" : "hidden"}
                  />
                  <label htmlFor={`todo-${index}`} className="cbx">
                    <svg width="14px" height="12px" viewBox="0 0 14 12">
                      <polyline points="1 7.6 5 11 13 1"></polyline>
                    </svg>
                  </label>
                  <label htmlFor={`todo-${index}`} className="cbx-lbl">
                    {item.title}
                  </label>
                </label>
              </div>
              <img
                src="https://png.pngtree.com/png-clipart/20210131/ourmid/pngtree-letter-x-serial-art-png-image_2878624.png"
                onClick={() => deleteTask(item.id)}
                className="delete-btn"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
