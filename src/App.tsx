import { useEffect, useState } from "react";
import "./App.css";
import { Task, getTasks, addTask, deleteTask, updateTask } from "./firebase";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(tasks);
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "1em",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <h2>Add a New Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask(title, description).then((task) => {
              setTasks([...tasks, task]);
              setTitle("");
              setDescription("");
            });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            style={{
              width: "100%",
              marginBottom: "1em",
            }}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            style={{
              width: "100%",
            }}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <button
              style={{
                marginTop: "1em",
              }}
              type="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div
        style={{
          marginTop: "2em",
        }}
      >
        <h2>Tasks</h2>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "1em",
              padding: "1em",
              border: "1px solid black",
              gap: "3em",
              backgroundColor: task.completed ? "lightgreen" : "white",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div
              style={{
                marginTop: "auto",
                flexDirection: "row",
                display: "flex",
                gap: "1em",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  const checked = e.target.checked;
                  updateTask({
                    ...task,
                    completed: checked,
                  }).then(() => {
                    setTasks(
                      tasks.map((t) => {
                        if (t.id === task.id) {
                          return {
                            ...t,
                            completed: checked,
                          };
                        }
                        return t;
                      }),
                    );
                  });
                }}
              />

              <button
                onClick={() => {
                  deleteTask(task.id).then(() => {
                    setTasks(tasks.filter((t) => t.id !== task.id));
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
