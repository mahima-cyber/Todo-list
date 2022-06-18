import React, { useEffect, useId, useState } from "react";
import {useNavigate} from "react-router-dom";


const Projects = () => {
  
  const [inputProject, setInputProject] = useState();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('projects')));
  const [isVisible, setIsVisible] = useState();
  const [updatedInput, setUpdateInput] = useState();
  const navigate= useNavigate();
  // const [ids,setIds]=useState();
//  const id=useId();
  // const value1=updatedInput
  
//   console.log(project1)
  const handleChange = (e) => {
    console.log("handleChange");
    setInputProject(e.target.value);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('projects'));
    if (data) {  
        setData([...data]);
    }
   }, []);
  useEffect(() => {

    // setData(project)
    localStorage.setItem("projects", JSON.stringify(data));
  }, [data]);

  const clickEvent = () => {
    const name = inputProject;
    // const ids = data.map((post) => {
    //   return post.id;
    // });
    // let uniqueId =
    // new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
    const ids=[data.length ]
    const id = Math.max.apply(null, ids) + 1;
    // const id=data.length + 1
    const post = { id: id, name: name };
     data.push(post);
     
    setData([...data]);
    
  };
  // const addProjects = () => {
  //   const name = inputProject;
  //   const ids = data.map((post) => {
  //     return post.id;
  //   });
  
  //   const id = Math.max.apply(null, ids) + 1;
  //   const post = { id: id, name: name };
  //   data.push(post);
  //   setData([...data]);
  // };
  const deleteProject = (id) => {
    console.log("deleted",id);
    // console.log("first", id);
    const data1 = data.filter((project) => project.id !== id);
    setData(data1);
    const feature = JSON.parse(localStorage.getItem('features'));
    localStorage.setItem("features", JSON.stringify( feature.filter((item)=>item.projectId!=id)));
    const todo =JSON.parse(localStorage.getItem('todoss'));
    console.log('tttt', todo)
    localStorage.setItem("todoss", JSON.stringify(todo.filter((item) =>item.projectId!=id)));
    
  };

  const editproject = (id, name) => {
    console.log("edited", id);
    setIsVisible(id);
    setUpdateInput(name);
  };

  const updateChange = (e) => {
    setUpdateInput(e.target.value);
  };

  const updateEvent = (id,name) => {
    console.log("updated ", id);
    console.log("updated2 ", name);
    let posts = [...data];
    var obj={
        name:name,
        id:id
    }
    posts.splice(id-1,1,obj)

    setData(posts);
    localStorage.setItem("projects", JSON.stringify(data));
    console.log(4444, data);
    setIsVisible('')
  };

  
  const jumpEvent=(id,name)=>{
      console.log("jumped",name)
      navigate(`/feature/${id}`)
    //   navigate('/feature',{state:{name}});
    //   localStorage.setItem("jumped",(name));
  }
  return (
      <div className="main-class">
    <center><div className='child-class1'>
        <h1>Projects</h1>
      <br/>
      <input type="text" onChange={handleChange} />
      <button onClick={
        clickEvent} className="btn"> +</button>
       {data.map((project, index) => {
        return (
          <div key={index}>
            {isVisible === project.id ? (
              <div>
                <input
                  type="text"
                  value={updatedInput}
                  onChange={updateChange}
                />
                <button onClick={() => {
                    updateEvent(project.id, updatedInput);
                  }} style={{backgroundColor:"green" ,color:"white"}}>
                Update</button>
              </div>
            ) : (
              <div>
                <p onClick={()=>{jumpEvent(project.id,project.name)}}
                 style={{fontWeight:"bold"}}>
                  {project.id} : {project.name} &nbsp;
                </p>
              </div>
            )}
            <button onClick={() => {editproject(project.id, project.name);}} className="edit">Edit </button>
            <button onClick={() => {deleteProject(project.id);}} className
            ="delete">Delete</button>{" "}
            <br />
          </div>
        );
      })}
      <br />
      <br />
      
    </div></center>
    </div>
  );
};
export default Projects;