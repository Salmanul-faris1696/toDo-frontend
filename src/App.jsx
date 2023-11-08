import { useState } from 'react'
import './App.css'
import ToDo from './components/ToDo'
import axios from "axios";

const baseUrl = "http://localhost:5000";
function App() {

  const [addToDo , setAddToDo] = useState("")  



  const createToDo = async () => {
    try {
       await axios.post(`${baseUrl}/save`,{text:addToDo});
      
      setAddToDo("")

    } catch (error) {
      console.error("Error creating task:", error);

      
    }
  }
  
  

  return (
    <div>
     <div className='m-3 bg-teal-600 md:w-fit mx-auto '>

      <div className='m-3 '>

        <div>

        <h1 className='flex justify-center text-2xl font-serif font-bold underline '>
          ToDo Application
        </h1>

        <p className='p-3 font-mono  '>
          Note your task below :
        </p>

        </div>

        <div className='p-3 flex gap-5 '>

          <input type="text" name="" id="" placeholder='add ToDos....'  value={addToDo} onChange={(e) => setAddToDo(e.target.value)} className='p-3 bg-black  text-white rounded-md w-80 border-b-2 border-yellow-400' />

       <button className='bg-black w-40 text-lg text-gray-300 rounded-lg shadow-lg shadow-slate-600 hover:text-amber-300 border-yellow-400 border' onClick={createToDo}>
        Add
       </button>

        </div>

        <div className='todolist'>

          <ToDo  />

        </div>



      </div>
      
     </div>
    </div>
  )
}

export default App
