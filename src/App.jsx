import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";

import Header from './components/Layout/Header';
import MaxiMenu from './components/Menus/MaxiMenu';
import { LanguageContext } from './components/Store/languageContext';



// Import styles
import './App.css'

const App = () => {

  // *** GET COVER ******************************************************************
  // ********************************************************************************
  const [abouts, setAbouts] = useState([]);
  const [error, setError] = useState(null);
  const [hasScrolled, sethasScrolled] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  
  window.addEventListener("scroll", function () {
    if (window.scrollY == 0) {
      // Scroll is top 
      sethasScrolled(false);
    } else {
      // Had Scroll
      sethasScrolled(true);
    }
  });

  // ** Datas about
  useEffect(() => {
    // Fetch des about
    axios
      .get("http://localhost:1337/api/abouts?populate=*")
      .then(({ data }) => {
        setAbouts(data.data);
      })
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  // ********************************************************************************

  // *** HOVER IMAGE ******************************************************************
  // ********************************************************************************
  const [hoverStates, setHoverStates] = useState(false);

  const mediaEnterEffect = () => {
    setHoverStates(true);
    const video = document.getElementById(`home-video`);
    if (video) {
      setTimeout(() => {
        video.play();
      }, 200);
    }
  };
  const mediaLeaveEffect = () => {
    setHoverStates(false);
    const video = document.getElementById(`home-video`);
    if (video) {
      setTimeout(() => {
        video.pause();
      }, 200);
    }
  };




  return (
    <>
      
      <div>
        {abouts.map(({ id, attributes }, index) => (
          <div className="cover" key={id}>
            <a href="#mu">
              {attributes.Cover.data.attributes.mime.startsWith('video/') ? (
                <div className={`video-wrap hover-effect ${hoverStates ? 'hover-on' : 'hover-off'}`} onMouseEnter={() => mediaEnterEffect()} onMouseLeave={() => mediaLeaveEffect()}>
                  <video id="home-video" playsInline muted loop >
                    <source src={'http://localhost:1337' + attributes.Cover.data.attributes.url} type={attributes.Cover.data.attributes.mime} />
                  </video>
                </div>
              ) : (
                <figure className={`hover-effect ${hoverStates ? 'hover-on' : 'hover-off'}`} onMouseEnter={() => mediaEnterEffect()} onMouseLeave={() => mediaLeaveEffect()}>
                  <img src={'http://localhost:1337' + attributes.Cover.data.attributes.url} alt={attributes.Cover.data.attributes.name} />
                </figure>
              )}
            </a>
          </div>
        ))}

      </div>


      <div id='bottom-menu--wrapper' className={hasScrolled ? 'scrolled' : ''}>
        <Header />
        <main className={hasScrolled ? 'scrolled' : ''}>
        </main>
        <MaxiMenu />
      </div >




    </>
  )
}

export default App
