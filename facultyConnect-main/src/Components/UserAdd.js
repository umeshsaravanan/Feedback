import { useState } from "react"
import { Userz } from "./Userz";
export const UserAdd=()=>{
    const [user,setUser]=useState("");
    const [student,setStudent]=useState([]);
    const set=(e)=>{
         setUser(e.target.value);
    }
   const colorchange=(id)=>{
        setStudent(student.map((u)=>{
          if(u.id===id){
              return {...u,completed:true};
          }
          else{
              return u;
          }
        }));
   }
   const deletetask=(id )=>{
      setStudent(student.filter((u) => u.id !== id 
      ));
   }
   const handle=()=>{
    const users=
        {
            id: student.length === 0 ? 1 : student[student.length-1].id +1,
            completed:false,
            uname:user,
        };
    setStudent([...student,users]);
   };
    return(
        <div>        <div id="n">
        <input type="text" placeholder="username" style={{width: "50vh",border:"none" }} onChange={set}/>
        <button id="ad" onClick={handle}>ADD</button>
        </div><br/>
        <div>
           {student.map((u)=>{ return(<Userz uname={u.uname} completed={u.completed} id={u.id} colorchange={colorchange} deletetask={deletetask} />)}) }
        </div>
       </div>

    )
}