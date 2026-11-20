<<<<<<< HEAD
import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'todo-list-tasks'

function readTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return { tasks: [], error: '' }

    const parsedTasks = JSON.parse(savedTasks)
    if (!Array.isArray(parsedTasks)) {
      throw new TypeError('Saved tasks are not in the expected format.')
    }

    return {
      tasks: parsedTasks.filter(
        (task) =>
          task &&
          typeof task.id === 'string' &&
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean',
      ),
      error: '',
    }
  } catch (error) {
    console.error('Unable to load saved tasks:', error)
    return { tasks: [], error: 'Saved tasks could not be loaded.' }
  }
}

function App() {
  const [initialState] = useState(readTasks)
  const [tasks, setTasks] = useState(initialState.tasks)
  const [storageMessage, setStorageMessage] = useState(initialState.error)
  const [taskInput, setTaskInput] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      setStorageMessage('')
    } catch (error) {
      console.error('Unable to save tasks:', error)
      setStorageMessage('Changes could not be saved in this browser.')
    }
  }, [tasks])

  const completedCount = tasks.filter((task) => task.completed).length
  const uncompletedCount = tasks.length - completedCount

  function addTask(event) {
    event.preventDefault()
    const text = taskInput.trim()

    if (!text) {
      setFormMessage('Please enter a task before adding it.')
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text,
        completed: false,
      },
    ])
    setTaskInput('')
    setFormMessage('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    if (editingId === taskId) setEditingId(null)
  }

  function startEditing(task) {
    setEditingId(task.id)
    setEditText(task.text)
    setFormMessage('')
  }

  function saveEdit(event, taskId) {
    event.preventDefault()
    const text = editText.trim()

    if (!text) {
      setFormMessage('A task cannot be empty.')
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, text } : task)),
    )
    setEditingId(null)
    setFormMessage('')
  }

  return (
    <main className="todo-page">
      <section className="todo-card" aria-labelledby="page-title">
        <h1 id="page-title">To Do List</h1>

        <form className="task-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="task-input">
            New task
          </label>
          <input
            id="task-input"
            className="form-control"
            type="text"
            placeholder="Enter a task..."
            autoComplete="off"
            maxLength={300}
            value={taskInput}
            onChange={(event) => {
              setTaskInput(event.target.value)
              setFormMessage('')
            }}
          />
          <button className="btn btn-primary add-button" type="submit">
            Add
          </button>
        </form>

        <p className="form-message" role="status" aria-live="polite">
          {formMessage || storageMessage}
        </p>

        <h2 className="task-list-heading">Task List</h2>
        <ul className="task-list" aria-label="Tasks">
          {tasks.map((task) => (
            <li
              className={`task-row${task.completed ? ' is-completed' : ''}`}
              key={task.id}
            >
              {editingId === task.id ? (
                <form className="edit-form" onSubmit={(event) => saveEdit(event, task.id)}>
                  <label className="visually-hidden" htmlFor={`edit-${task.id}`}>
                    Edit task
                  </label>
                  <input
                    id={`edit-${task.id}`}
                    className="form-control task-edit-input"
                    type="text"
                    maxLength={300}
                    value={editText}
                    onChange={(event) => {
                      setEditText(event.target.value)
                      setFormMessage('')
                    }}
                    autoFocus
                  />
                  <div className="task-actions">
                    <button className="btn btn-primary btn-sm" type="submit">
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFormMessage('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark "${task.text}" complete`}
                  />
                  <span className="task-name">{task.text}</span>
                  <div className="task-actions">
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => startEditing(task)}
                      aria-label={`Edit "${task.text}"`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete "${task.text}"`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="empty-message">No tasks yet. Add one above!</p>
        )}

        <hr className="task-divider" />
        <footer className="task-stats" aria-live="polite">
          <p>
            Completed: <span>{completedCount}</span>
          </p>
          <p>
            Uncompleted: <span>{uncompletedCount}</span>
          </p>
        </footer>
      </section>
    </main>
  )
}

export default App
=======
import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'todo-list-tasks'

function readTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return { tasks: [], error: '' }

    const parsedTasks = JSON.parse(savedTasks)
    if (!Array.isArray(parsedTasks)) {
      throw new TypeError('Saved tasks are not in the expected format.')
    }

    return {
      tasks: parsedTasks.filter(
        (task) =>
          task &&
          typeof task.id === 'string' &&
          typeof task.text === 'string' &&
          typeof task.completed === 'boolean',
      ),
      error: '',
    }
  } catch (error) {
    console.error('Unable to load saved tasks:', error)
    return { tasks: [], error: 'Saved tasks could not be loaded.' }
  }
}

function App() {
  const [initialState] = useState(readTasks)
  const [tasks, setTasks] = useState(initialState.tasks)
  const [storageMessage, setStorageMessage] = useState(initialState.error)
  const [taskInput, setTaskInput] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      setStorageMessage('')
    } catch (error) {
      console.error('Unable to save tasks:', error)
      setStorageMessage('Changes could not be saved in this browser.')
    }
  }, [tasks])

  const completedCount = tasks.filter((task) => task.completed).length
  const uncompletedCount = tasks.length - completedCount

  function addTask(event) {
    event.preventDefault()
    const text = taskInput.trim()

    if (!text) {
      setFormMessage('Please enter a task before adding it.')
      return
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text,
        completed: false,
      },
    ])
    setTaskInput('')
    setFormMessage('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    if (editingId === taskId) setEditingId(null)
  }

  function startEditing(task) {
    setEditingId(task.id)
    setEditText(task.text)
    setFormMessage('')
  }

  function saveEdit(event, taskId) {
    event.preventDefault()
    const text = editText.trim()

    if (!text) {
      setFormMessage('A task cannot be empty.')
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? { ...task, text } : task)),
    )
    setEditingId(null)
    setFormMessage('')
  }

  return (
    <main className="todo-page">
      <section className="todo-card" aria-labelledby="page-title">
        <h1 id="page-title">To Do List</h1>

        <form className="task-form" onSubmit={addTask}>
          <label className="visually-hidden" htmlFor="task-input">
            New task
          </label>
          <input
            id="task-input"
            className="form-control"
            type="text"
            placeholder="Enter a task..."
            autoComplete="off"
            maxLength={300}
            value={taskInput}
            onChange={(event) => {
              setTaskInput(event.target.value)
              setFormMessage('')
            }}
          />
          <button className="btn btn-primary add-button" type="submit">
            Add
          </button>
        </form>

        <p className="form-message" role="status" aria-live="polite">
          {formMessage || storageMessage}
        </p>

        <h2 className="task-list-heading">Task List</h2>
        <ul className="task-list" aria-label="Tasks">
          {tasks.map((task) => (
            <li
              className={`task-row${task.completed ? ' is-completed' : ''}`}
              key={task.id}
            >
              {editingId === task.id ? (
                <form className="edit-form" onSubmit={(event) => saveEdit(event, task.id)}>
                  <label className="visually-hidden" htmlFor={`edit-${task.id}`}>
                    Edit task
                  </label>
                  <input
                    id={`edit-${task.id}`}
                    className="form-control task-edit-input"
                    type="text"
                    maxLength={300}
                    value={editText}
                    onChange={(event) => {
                      setEditText(event.target.value)
                      setFormMessage('')
                    }}
                    autoFocus
                  />
                  <div className="task-actions">
                    <button className="btn btn-primary btn-sm" type="submit">
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFormMessage('')
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark "${task.text}" complete`}
                  />
                  <span className="task-name">{task.text}</span>
                  <div className="task-actions">
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => startEditing(task)}
                      aria-label={`Edit "${task.text}"`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete "${task.text}"`}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="empty-message">No tasks yet. Add one above!</p>
        )}

        <hr className="task-divider" />
        <footer className="task-stats" aria-live="polite">
          <p>
            Completed: <span>{completedCount}</span>
          </p>
          <p>
            Uncompleted: <span>{uncompletedCount}</span>
          </p>
        </footer>
      </section>
    </main>
  )
}

export default App
>>>>>>> db924600aee225627f76e3133dbc4c49f702be1a
