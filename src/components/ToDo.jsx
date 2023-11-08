import React, { useEffect, useState } from 'react'
import {HiClipboardList} from 'react-icons/hi'
import {RiFileEditFill} from 'react-icons/ri'
import {MdDeleteForever} from 'react-icons/md'
import axios from "axios";




function ToDo() {
const controller = new AbortController()
  const [todoList ,setTodoList] = useState([]);


  const [todoedit, setTodoEdit] = useState({_id: null, text: ""})


  useEffect(() => {
    getAllToDo()

    return () => controller.abort() 

  },[])

    const baseUrl = "http://localhost:5000";

  const getAllToDo = async () => {
    console.log("hi");
   try { 
    const response = await axios.get(baseUrl);
     setTodoList(response.data)
    
   } catch (error) {
    console.log("Error occured while fetching your data",error)
    
   }
  };


  const updateToDo = async (_id) => {
    try {
      await axios.post(`${baseUrl}/update`,{_id,text:todoedit.text});

      const update = todoList.map((toDo) => (
      toDo._id === _id ? {...toDo, text:todoedit.text } : toDo));

      setTodoList(update);
      setTodoEdit({_id:null, text: ""})
       
    } catch (error) {
            console.error("Error updating toDo:", error);

      
    }
  }


  // console.log({todoList});

 const handleKeyDown = (taskId, e) => {
    console.log({key: e.keyCode, taskId});
    if (e.keyCode === 13) {
      updateToDo(taskId);
      console.log(e.keyCode);
    }
  };
  const deleteToDo = async(_id) =>{
    try{
      await axios.post(`${baseUrl}/delete/${_id}`)
      setTodoList(todoList.filter((toDo => toDo._id !== _id)))
    }catch (error) {
      console.error("Error deleting toDo:", error);
    }
  }

  return (
    <div className='bg-slate-600 m-3 p-3 rounded-md border shadow-md shadow-gray-700'>

      {
        todoList.map(({ _id , text}) =>
        _id == todoedit._id ?
        (
      <div key={_id} className='bg-black m-3 text-white flex justify-between p-3 border border-yellow-400 rounded-md mb-5'>

        <p className='flex '>

          <HiClipboardList size={25}/>
    

           <input type="text" name="" id="" placeholder='add ToDos....'  value={todoedit.text}   onChange={(e) =>
                    setTodoEdit({ ...todoedit, text: e.target.value })
                  }
                  onKeyDown={(e) => handleKeyDown(todoedit._id, e)}   className='p-3 bg-black  text-white rounded-md w-80 border-b-2 border-yellow-400' />
           
        </p>
      </div>
        ) :
        (
      <div key={_id} className='bg-black m-3 text-white flex justify-between p-3 border border-yellow-400 rounded-md mb-5'>

        <p className='flex '>

          <HiClipboardList size={25}/>

        {text}


           
        </p>

        <div className='flex gap-3' >

        <div className='cursor-pointer ' onClick={() => setTodoEdit({_id: _id, text})} >
          <RiFileEditFill size={25}/>
        </div>

        <div className='cursor-pointer' onClick={ () => deleteToDo(_id)}>
          <MdDeleteForever size={25}/>
        </div>
        </div>

        
      </div>

        )
        
        )
      }
      
        
    </div>
  )
}

export default ToDo