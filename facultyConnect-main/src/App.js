
import './App.css';

import MainPage from './Components/MainPage';
import Admin from './Components/Admin';
import Student from './Components/Student'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import { UserAdd } from './Components/UserAdd';
import RatingForm from './Components/RatingForm';
import StarRatingForm from './Components/StarRatingForm'
import { TenQuestionRatingForm } from './Components/TenQuestionRatingForm';
import { Semes } from './Components/Semes';
import { ac_year } from './Helper/Context';
import { subz } from './Helper/Context';
import { useState } from 'react';
import { semester } from './Helper/Context';
import AddSubjectForm from './Components/AddSubjectForm';
import Delete from './Components/Delete';
import Update from './Components/Update';
import { ReportGenerate } from './Components/ReportGenerate';
const App = () => {
  const [yr,setYear]=useState('');
  const [sem,setSem]=useState('');
  const [sub,setSub]=useState('');
  return(
  <BrowserRouter>
  <ac_year.Provider value={{yr,setYear}}>
    <semester.Provider value={{sem,setSem}}>
      <subz.Provider value={{sub,setSub}}>
  <Routes>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path='/rg' element={<RatingForm/>}/>
    <Route path="/academics" element={<Student/>} />
    <Route path="/adlogin" element={<Login name="ADMIN"/>} />
    <Route path="/stdlogin" element={<Login name="STUDENT"/>} />
    <Route path="/upd" element={<Update/>}/>
    <Route path="/sadd" element={<UserAdd/>} />
    <Route path="/dlt" element={<Delete/>}/>
    <Route path="/aform" element={<AddSubjectForm/>}/>
    <Route path="/rgf" element={<StarRatingForm/>}/>
    <Route path='/questions' element={<TenQuestionRatingForm/>}/>
    <Route path='/semester' element={<Semes/>}/>
    <Route path='/report' element={<ReportGenerate/>}/>
      </Routes>
      </subz.Provider>
      </semester.Provider>
      </ac_year.Provider>
      </BrowserRouter>
  )}

export default App;
