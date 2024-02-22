 import { useState } from "react"
import { TodoContextProvider } from "./contexts"
import { useEffect } from "react";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
function App() {
  const [todos,setTodos] = useState([]);
    const addTodo = (todo)=>{
        setTodos((prev)=>[...prev,{id:prev.length+1,...todo}]);  
    }
    const updateTodo = (id,todo)=>{
        setTodos((prev)=>{
          return prev.map((item)=> item.id === id ? todo : item)
        })
    }
    const deleteTodo = (id)=>{
         setTodos((prev)=>{
          const updatedTodo = prev.filter((todo)=>todo.id!==id);
          return updatedTodo;
         })
    }
    const toggleComplete = (id) => {
      //console.log(id);
      setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id ? { ...prevTodo, 
          completed: !prevTodo.completed } : prevTodo))
    }

    useEffect(()=>{
     const todos =  JSON.parse(localStorage.getItem("todos"));
     if(todos && todos.length>0){
       setTodos(todos);
     }
    },[])

    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos));
    },[todos])

  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}> 
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                     
                       {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
            </TodoContextProvider>
  )
}

export default App
