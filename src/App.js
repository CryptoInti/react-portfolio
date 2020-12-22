import React, { Component, useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

function App(props) {
  console.log('props', props)
  const [lenguage, setLenguage] = useState('');
  const [resumeData, setResumeData] = useState({});
  const [foo, setFoo] = useState('bar');
  // let  [,setState]=useState();

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     foo: 'bar',
  //     lenguage: 'en',
  //     resumeData: {}
  //   };

  useEffect(() => {
    getResumeData(lenguage)
    return () => {
      setResumeData(lenguage)
      console.log('lenguage changed to:', lenguage)
      // setState({});
    }
  }, [lenguage]);

  // getResumeData(){
  //   $.ajax({
  //     url:'/resumeData.json',
  //     dataType:'json',
  //     cache: false,
  //     success: function(data){
  //       this.setState({resumeData: data});
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.log(err);
  //       alert(err);
  //     }
  //   });
  // }

  const getResumeData = (lenguage) => {
    $.ajax({
      url: `/resumeData${lenguage}.json`,
      dataType: 'json',
      cache: false,
      success: function (data) {
        console.log('data', data)
        setResumeData(data);
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  // componentDidMount(){
  //   this.getResumeData();
  // }

  const handleLenguage = () => {
    console.log('handlerLenguage', lenguage)
    setLenguage(!lenguage ? 'Es' : '')
  }


  return (
    <div className="App">
      <Header data={resumeData.main} handleLenguage={handleLenguage} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Testimonials data={resumeData.testimonials} />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </div>
  );

}

export default App;
