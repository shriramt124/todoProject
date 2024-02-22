import {useContext} from "react";
import { createContext } from "react";

export const TodoContext = createContext({
    todos : [{
           id:1,
           todo:'todo message',
           completed:false
    },{
        id:2,
        todo:'todo message',
        completed:false
    }],

    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id) =>{},
    toggleComplete:(id)=>{}
});
export  const useToDo = ()=>{
    return useContext(TodoContext);
}
export const TodoContextProvider = TodoContext.Provider;
 

