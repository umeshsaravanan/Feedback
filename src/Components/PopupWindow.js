import React from 'react';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs} from 'firebase/firestore';
import { db } from './config/firebase-config';
import Bar from './Bar';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import emailjs from 'emailjs-com';
import { emailJsConfig } from './config/firebase-config';
function PopupWindow(props) {
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState('');
  const [documentFound, setDocumentFound] = useState(true);
  const [totalresponse,setTotalresponse]=useState('');
  const [email, setEmail] = useState('');
   const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    const ratingsCollection = collection(db, 'rating');
    const q = query(ratingsCollection, where('year', '==', props.y), where('semester', '==',props.s), where('subject', '==', props.ss));

    // Use the getDocs function to query the Firestore collection and get the ratings array
    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setDocumentFound(false);
          return;}
        querySnapshot.forEach((doc) => {
          setRatings(doc.data().rate);
          console.log(doc.data().rate);
        });
      })
      .catch((error) => {
        console.error('Error getting document: ', error);
      });
  }, [props.y, props.s,props.ss]);
  useEffect(() => {
    if (ratings.length > 0) {
      // Calculate the average rating from the ratings array
      const sum = ratings.reduce((acc, rating) => acc + parseFloat(rating), 0);
      const average = sum / ratings.length;
      setTotalresponse(ratings.length);
      setAverageRating(average.toFixed(2));
    }
  }, [ratings]);
  const handleDownload = () => {
    html2canvas(document.querySelector(".popup-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 2, 5, pdfWidth, pdfHeight);
     
      pdf.save("download.pdf");
      const pdfBlob = pdf.output('blob');

      // Create a new FormData object and append the PDF blob to it
      const formData = new FormData();
      formData.append('pdf', pdfBlob, 'download.pdf');
      formData.append('receiverEmail', email);
      // Add your EmailJS service details
      const serviceId = 'service_ze02s2b';
      const templateId = 'template_4od35ut';
      const userId = 'JhNy4JhUODFDG-cFu';
  
      // Send the email using EmailJS
      emailjs.sendForm(serviceId, templateId, formData, emailJsConfig.userId)
        .then(() => {
          console.log('Email sent successfully!');
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    });
  };

  return (
    <div className="popup-container">
      {documentFound ? (
      <>
      <h2 id='d'>{props.y}</h2>
      <h2 id='d'>{props.s}</h2>
      <h2 id='d'>{props.ss}</h2>
      <h2 id='d'>{averageRating} out of 5</h2>
      <h3 id='t'>Total Response : {totalresponse}</h3>
      <Bar value={averageRating}/>
      <h2>{(averageRating/5)*100}%</h2>
      <button id='azz' onClick={handleDownload}>Download as PDF</button>
      <input type="email" placeholder="Enter receiver's email" value={email} onChange={handleEmailChange} />
      {/* <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} /> */}
      </>
    ) : (
      <p>No such document found.</p>
    )}
    </div>
  );
}
export default PopupWindow;