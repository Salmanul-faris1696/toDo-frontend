import axios from "axios";


  const baseUrl = "https://todo-backend-nu2b.onrender.com";

  const getAllToDo = async () => {
   try { 
    const response = await axios.get(baseUrl);
     setToDo(response.data)
    
   } catch (error) {
    console.log("Error occured while fetching your data",error)
    
   }
  };

  export {getAllToDo};