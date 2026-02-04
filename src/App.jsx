// import React, { useState } from 'react'
// import Navbar from './Components/Navbar/Navbar'
// import Hero from './Components/Hero/Hero'
// import Programs from './Components/Programs/Programs'
// import Title from './Components/Title/Title'
// import About from './Components/About/About'
// import Campus from './Components/Campus/Campus'
// import Testimonials from './Components/Testimonials/Testimonials'
// import Contact from './Components/Contact/Contact'
// import Footer from './Components/Footer/Footer'
// import VideoPlayer from './Components/VideoPlayer/VideoPlayer'

// const App = () => {

//    const[playState,setPlayState] =useState(false);
 
     
//   return (
//     <div>
//       <Navbar/>
//       <Hero/>
//       <div className='container'>
//         <Title subTitle='Our PROGRAM' title='What We Offer'/>
//         <Programs/>
//         <About setPlayState={setPlayState} />
//         {/* setPlayState={setPlayState} */}
//         <Title subTitle='Gallery' title='Campus Photos'/>
//         <Campus/>
//         <Title subTitle='TESTIMONIALS' title='What Student Says'/>
//         <Testimonials/>
//         <Title subTitle='Contact Us' title='Get in Touch'/>
//         <Contact/>
//         <Footer/>
//       </div>
//      <VideoPlayer playState={playState} setPlayState={setPlayState}/>
//      {/* playState={playState} setPlayState={setPlayState} */}
//     </div>
//   )
// }

// export default App


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Programs from './Components/Programs/Programs';
import DegreeProgramsList from './Components/DegreeProgramsList/DegreeProgramsList';
import DegreeDetails from './Components/DegreeDetails/DegreeDetails';
import Title from './Components/Title/Title';
import About from './Components/About/About';
import Campus from './Components/Campus/Campus';
import Testimonials from './Components/Testimonials/Testimonials';
import FAQ from './Components/FAQ/FAQ';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  // State to toggle video player visibility
  const [playState, setPlayState] = useState(false);

  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              {/* Navigation Bar */}
              <Navbar />

              {/* Hero Section */}
              <Hero />

              <div className="container">
                {/* Programs Section */}
                <Title subTitle="Our PROGRAM" title="What We Offer" />
                <Programs />

                {/* About Section with Video Trigger */}
                <About setPlayState={setPlayState} />

                {/* Campus Gallery */}
                <Title subTitle="Gallery" title="Campus Photos" />
                <Campus />

                {/* Testimonials */}
                <Title subTitle="TESTIMONIALS" title="What Students Say" />
                <Testimonials />

                {/* FAQ Section */}
                <Title subTitle="FAQ" title="Frequently Asked Questions" />
                <FAQ />

                {/* Contact Section */}
                <Title subTitle="Contact Us" title="Get in Touch" />
                <Contact />
              </div>

              {/* Footer */}
              <Footer />

              {/* Video Player */}
              <VideoPlayer playState={playState} setPlayState={setPlayState} />
            </>
          } />
          <Route path="/programs/:programId" element={<DegreeProgramsList />} />
          <Route path="/degree/:degreeId" element={<DegreeDetails />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
