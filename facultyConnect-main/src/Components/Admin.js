import React from 'react';
import { ReportGenerate } from './ReportGenerate';
import AddSubjectForm from './AddSubjectForm';
import { useNavigate } from 'react-router-dom';
const Admin=()=>{
    const navigate=useNavigate();
    return(
<div>
            <h1 id='adhead'>Welcome Admin</h1>
            <div id='adbody'> 
            <h2><button id='as' onClick={()=>navigate('/aform')}>ADD ACADEMIC YEAR</button>
            <button id='as' onClick={()=>navigate('/dlt')}>Delete</button>
            <button id='as'  onClick={()=>navigate('/upd')}>Update</button>
            <button id='as' onClick={()=>navigate('/report')}>Generate report</button></h2>
            <button id='et' onClick={()=>navigate('/')}>EXIT</button>
                {/* <div><AddStud/></div> */}
             {/* <div><ReportGenerate/></div> */}
             
            </div>
           
</div>)
}

       

export default Admin;
