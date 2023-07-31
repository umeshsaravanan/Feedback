import { useEffect, useState } from "react";
import { db } from './config/firebase-config';
import { getDocs,collection,getFirestore,query,where } from "firebase/firestore";
import PopupWindow from "./PopupWindow";

export const ReportGenerate=()=>{

    const [options, setOptions] = useState([]);
    const [formCompleted, setFormCompleted] = useState(false);
  

    const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    setShowPopup(true);
    console.log('hi');
    event.preventDefault();
  };

  

    const [academicYear, setAcademicYear] = useState('');
    const [semester, setSemester] = useState('');
    const[sub,setSub]=useState('');
  
    const [yearList, setYearList] = useState([]);
    const yearCollectionRef = collection(db, "academic_year"); 
    const getYearList = async () => {
        try {
          const data = await getDocs(yearCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setYearList(filteredData);
        } catch (err) {
          console.error(err);
        }
      };
    
      useEffect(() => {
        getYearList();
      }, []); 
      useEffect(() => {
        const isFormCompleted =
           academicYear!== '' &&
           semester!== '' &&
          sub!== '';
        setFormCompleted(isFormCompleted);
      }, [academicYear,semester,sub]);
   
    const handleUpdate = event => {
        const soption = event.target.value;
        setSemester(soption);
        const q = query(collection(db, 'academic_year'), where('year', '==', academicYear)); // Replace with your field name and value
        
        getDocs(q)
          .then(querySnapshot => {
            console.log(soption);
            const optionsData = querySnapshot.docs.map(doc => doc.data()[soption]);
            console.log(optionsData); 
            console.log(yearList);  
            setOptions(optionsData);
          })
          .catch(error => {
            console.log('Error getting documents:', error);
          });
          

    }
    useEffect(() => {
       
      }, []); 
   
    return(
        
        <div id="ob">
        <div id='nb'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="academicYear" className="form-label" id='laadd'>Academic Year</label>
        
            <select
            className="form-control"
            id="sel"
            onChange={(e) => setAcademicYear(e.target.value)}
            required>
               <option value="">---select--- </option>
               {yearList.map((movie) => (
              <option value={movie.year}>{movie.year}</option>))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="semester" className="form-label" id='laadd'>Semester</label>
            <select id='sel'   className="form-control" value={semester} onChange={handleUpdate}  required>
            <option value="">---select--- </option>
            <option value="sem1">sem1</option>
            <option value="sem2">sem2</option>
            <option value="sem3">sem3</option>
            <option value="sem4">sem4</option>
            <option value="sem5">sem5</option>
            <option value="sem6">sem6</option>
            <option value="sem7">sem7</option>
            <option value="sem8">sem8</option>
          </select>
          <label className="form-label" id='laadd'>Subjects</label>
          <select id='sel'   className="form-control" value={sub} onChange={(e)=>setSub(e.target.value)} required>
          <option value="">Select an option</option>
          {options.map((option) => (option.map((e)=>(
            <option key={e} value={e}>{e}</option>

          )))
          )}
          </select>
         
           
          </div>
         <input type="submit" value="Generate Report" className="btn btn-primary" id='bcx' disabled={!formCompleted} ></input>
         {showPopup && <PopupWindow y={academicYear} s={semester} ss={sub} />}
          </form>
          </div>
          </div>
    )
}