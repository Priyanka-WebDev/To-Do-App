// import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';


function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const savetoLocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    savetoLocal()
  }

  const handleDelete = (e, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
    savetoLocal()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    setTodos(newtodos)
    savetoLocal()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLocal()
  }
  const handleChange = (e) => {
    //input to chang
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <h1 style={{ color: "#333", fontSize: "2rem", textAlign: "center" }} className='font-bold text-xl mx-10 mt-5'>TODO APP</h1>
      <div className="container mx-auto m-5 p-5 rounded-xl bg-slate-700 min-h-[80vh] " style={{ width: "768px" }}>

        <div className="addtodo my-5">
          <h2 className='text-lg font-bold ' style={{ color: "#fff" }}>Add a todo</h2>
          <input onChange={handleChange} value={todo} type="text" name="" id="" className='w-2/4' style={{ padding: '6px 8px' }} />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-600 p-2 py-2  font-bold text-white rounded-lg m-7 disabled:bg-slate-500'>Save</button>
        </div>

        <h2 className='text-lg font-bold' style={{ color: "#fff" }}>Your To-Do</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5' style={{ color: "#fff" }}> No todos to display</div>}
          {todos.map((item) => {
            return <div key={item.id} className=" todo flex w-3/4 my-3 justify-between">
              <div className='flex gap-10'>
                <input onChange={handleCheckbox} type="checkbox" name={item.id} id="" value={item.isCompleted} />
                <div style={{ color: "#fff" }} className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-600 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-600 p-2 py-1 font-bold text-white rounded-lg mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>

        
      </div>
    </>
  )
}

export default App
