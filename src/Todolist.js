import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router";

const Todolist = () => {
  const id2=useParams();

  // console.log(123,id2.featureIds,id2.projectIds,)

  const [todos,setTodos] = useState( JSON.parse(localStorage.getItem('todoss')))
  // const [todos,setTodos] = useState( [
  //   { featureId: id2.id ,projectId:id2.id2,name:"todos1",id:1 },
  //   ])

  const [inputProject, setInputProject] = useState();
  const [isVisible, setIsVisible] = useState();
  const [updatedInput, setUpatedInput] = useState();
  const navigate= useNavigate();

  const handleChange = (e) => {
    // console.log("handleChange");
    setInputProject(e.target.value);
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todoss'));
    if (todos) {
      setTodos([...todos]);
    }
   }, []);
  useEffect(() => {
    // Setdata(project)
   
    localStorage.setItem("todoss", JSON.stringify(todos));
  }, [todos]);
  const clickEvent = () => {
    const name = inputProject;
    const featureId=id2.featureIds;
    const projectId=id2.projectIds
    console.log(11111222333,todos)
    const completed=false;
    // const ids = todos.map((post) => {
    //   return post.id;
    // });
     const id=todos.length+1
    // const id = Math.max.apply(null, ids) + 1;
    const post = { projectId:projectId,featureId: featureId, name: name,id: id,completed:completed };
     todos.push(post);
    setTodos([...todos]);
  };

  const deleteProject = (id) => {
    console.log("deleed");
    console.log("first", id);
    const data1 = todos.filter((todos1) => todos1.id !== id);
    setTodos(data1);
    
    // const delfeature = JSON.parse(localStorage.getItem('features'));
    // localStorage.setItem("features", JSON.stringify( delfeature.filter((item)=>item.featuresId2!=id)));
  };

  const editproject = (id, name) => {
    console.log("edited", id);
    setIsVisible(id);
    setUpatedInput(name);
  };
  const updateChange = (e) => {
    setUpatedInput(e.target.value);
  };

  const updateEvent = (id, name) => {
    console.log("updated ", id);
    console.log("updated2 ", name);
    let posts = todos;
    posts.map((post) => {
      if (post.id === id) {
        post.name = name;
      }
      // console.log('ppppppp', post.id, id)
      // console.log('ttttttttt', post.title)
    });
    setTodos( posts );
    setIsVisible('')
    console.log(4444, todos);
    localStorage.setItem("todoss", JSON.stringify(todos));
  };

  const toggleTodos=(id)=>{
    todos.find((item)=>{
      if(item.id===id){
        item.completed=!item.completed;
        
      }
      return (setTodos([...todos]))
    })

  }
  return (
      <div>
    <center><div className="child-class1">
      <div> 
      <button onClick={() => navigate(-1)} className="back"> Go back </button>
        {/* <Link to="/">Back to Project!!!</Link> */}
      </div>
      {/* <h1>{project}</h1> */}

      <h1>{id2.featureIds}</h1>  
         <h2>Todolist</h2>
      <input type="text" onChange={handleChange} />
      <button onClick={clickEvent} className="btn"> +</button>
   
      {
        todos.filter((item)=>item.featureId===id2.featureIds&&item.projectId===id2.projectIds).map((todoss,index)=>{
         return(
           <div key={index}>
             {
               isVisible===todoss.id ? 
               <div>
                <input
                  type="text"
                  value={updatedInput}
                  onChange={updateChange}
                />
                <button
                  onClick={() => {
                    updateEvent(todoss.id, updatedInput);
                  }} style={{backgroundColor:"green" ,color:"white"}}>Update 
                </button>
              </div>:
               <div>
                <p >  {todoss.name}  <input style={{ width:15 }} type="checkbox" onChange={()=>{toggleTodos(todoss.id)}}  /></p>
             {/* <button onClick={()=>{toggleTodos(todoss.id)}}></button> */}
             <button onClick={()=>{editproject(todoss.id,todoss.name)}} className="edit">Edit</button>
             <button onClick={()=>{deleteProject(todoss.id)}} className="delete">Delete</button>
            
             </div>
             }
             
           </div>
         )
        })
      }   
    </div></center>
    </div>
  )
}

export default Todolist