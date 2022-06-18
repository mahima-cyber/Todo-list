import React, { useEffect, useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import { useParams } from "react-router";

const Features = () => {
  const id1=useParams();

  const [feature,setFeature] = useState( JSON.parse(localStorage.getItem('features')))
  // const [feature,setFeature] = useState( [
  //   { projectId: id1.id ,name:"Feature1",id:1 },
  //   ])

  const [inputProject, setInputProject] = useState();
  const [isVisible, setIsVisible] = useState();
  const [updatedInput, setUpatedInput] = useState();
  const navigate= useNavigate();

  const handleChange = (e) => {
    console.log("handleChange");
    setInputProject(e.target.value);
  };
  useEffect(() => {
    const feature = JSON.parse(localStorage.getItem('features'));
    if (feature) {
      setFeature([...feature]);
    }
   }, []);
  useEffect(() => {
    // Setdata(project)
    localStorage.setItem("features", JSON.stringify(feature));
  }, [feature]);

// console.log(33333,feature)
  const clickEvent = () => {
    console.log(11111222333,feature)
    const name = inputProject;
    const projectId=id1.id;
    // const ids = feature.map((post) => {
    //   return post.id;
    // });
    const ids=[feature.length]
    const id = Math.max.apply(null, ids) + 1;
    const post = { projectId: projectId, name: name,id: id };
     feature.push(post);
    setFeature([...feature]);
  };

  const deleteProject = (id) => {
    console.log("deleed");
    console.log("first", id);
    // const todos = JSON.parse(localStorage.getItem('todoss'))
    const data1 = feature.filter((feature1) => feature1.id !== id);
    setFeature(data1);
    const todo = JSON.parse(localStorage.getItem('todoss'));
    localStorage.setItem("todoss", JSON.stringify( todo.filter((item)=>item.featureId!=id)));
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
    let posts = feature;
    posts.map((post) => {
      if (post.id === id) {
        post.name = name;
      }
      console.log(33333555555,feature)
      // console.log('ppppppp', post.id, id)
      // console.log('ttttttttt', post.title)
    });
    setFeature( posts );
    localStorage.setItem("features", JSON.stringify(feature));
    setIsVisible('')
    console.log(4444, feature);
  };
  const jumpEvent=(featureIds,projectIds)=>{
      console.log("jumped1111",featureIds,projectIds)
      // navigate("/todolist")
      navigate(`/todolist/${featureIds}/${projectIds}`)
      // localStorage.setItem("jumped2",(name));

  }

  return (
    <div>
       <center> <div className="child-class1">
      <div> 
      <button onClick={() => navigate(-1)} className="back"> Go back </button>
        {/* <Link to="/">Back to Project!!!</Link> */}
      </div>
      {/* <h1>{project}</h1> */}
      <h1>Feature Id</h1>
      <h2>{id1.id}</h2>   
      <input type="text" onChange={handleChange} />
      <button onClick={clickEvent} className="btn"> +</button>
      {
        feature.filter((item)=>item.projectId===id1.id).map((features,index)=>{
  
         return(
           <div key={index}>
             {
               isVisible===features.id ? 
               <div>
                <input
                  type="text"
                  value={updatedInput}
                  onChange={updateChange}
                />
                <button
                  onClick={() => {
                    updateEvent(features.id, updatedInput);
                  }}style={{backgroundColor:"green" ,color:"white"}}> Update
                </button>
              </div>:
               <div>
            <p onClick={()=>{jumpEvent(features.id,id1.id)}} style={{fontWeight:"bold"}}> {features.name} </p>
             <button onClick={()=>{editproject(features.id,features.name)}} className="edit">Edit</button>
             <button onClick={()=>{deleteProject(features.id)}} className="delete">Delete</button></div>
             }
             
           </div>
         )
        })
      }   
     
  
      
      </div></center>
    </div>
  )
}

export default Features