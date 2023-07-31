import { useNavigate } from "react-router-dom";
import { semester } from "../Helper/Context";
import { useContext } from "react";
const Sem=(props)=>{
    const {sem,setSem}=useContext(semester);
   const navigate=useNavigate();
   const data=[
    {
        id:1,name:"sem1"
    },
    {
        id:2,name:"sem2"
    }, 
    {
        id:3,name:"sem3"
    },
    {
        id:4,name:"sem4"
    },
    {
        id:5,name:"sem5"
    },
    {
        id:6,name:"sem6"
    },
    {
        id:7,name:"sem7"
    },
    {
        id:8,name:"sem8"
    },
   ]
    return(
        <div id="b">
        {
            data.map((sm)=>(<button id="bts" onClick={()=>{
              setSem(sm.name);
              navigate('/semester');
            }}>{sm.name}</button>))
        }
    
</div>
    )
}
export default Sem;