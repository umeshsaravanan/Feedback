import './sub.css'
import { useNavigate } from "react-router-dom";
import { ac_year } from '../Helper/Context';
import { useContext, useEffect, useState } from 'react';
import { db } from './config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { semester } from '../Helper/Context';
import { subz } from '../Helper/Context';
export function Semes(){

  const navigate=useNavigate();

  const {sem,setSem}=useContext(semester);

  const{sub,setSub}=useContext(subz);

  const [yearList,setYearList]=useState([]);

  const [fldata,setfl]=useState([]);

  const {yr,setYear}= useContext(ac_year);

  const yearCollection= collection(db,"academic_year");

  useEffect(()=>{ 
      getDocs(yearCollection).then((j)=>setfl(j.docs.map((doc)=>({...doc.data(),id:doc.id,}))));
  },[]);
 
    const [nlist,setnList]=useState([]);
 
   useEffect(()=>{

   if(fldata.length>0)
    fldata.forEach((e)=>{if(e.year===yr ){
     for(const key in e)if(sem==key){setnList(e[key]);break;}}
    })},[fldata]);
  function handlesubmit(event){
    setSub(event);
    console.log(event);
    navigate('/questions');
   
  }
return(

     <div id='b'>
      <h3 id='sl'> Select the subject</h3>
       {  nlist.map((sb,index)=>(
         <div id='bx' key={index}>
             <button  id='bzzz'  onClick={()=>handlesubmit(sb)}>{sb}</button>
             </div>
       ))}
     </div>
)
}