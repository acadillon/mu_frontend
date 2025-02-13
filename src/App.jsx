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
    axios
      .get("https://railwayapp-strapi-production-540e.up.railway.app/api/about?populate=*")
      .then(({ data }) => {
        // Modification ici pour stocker les données correctement
        setAbouts([data.data]);
      })
      .catch((error) => setError(error));
  }, []);

  // Déplacer cette vérification après tous les hooks
  const renderError = () => {
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }
    return null;
  };

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
      {renderError()}
      <div className='cover-wrapper'>
        {abouts.map((item) => {
          console.log("Cover direct:", item.Cover); // Pour debug
          return (
            item?.Cover?.[0] ? (
              <div className="cover" key={item.id}>
                <a href="#mu">
                  {item.Cover[0].mime.startsWith('video/') ? (
                    <div className={`video-wrap hover-effect ${hoverStates ? 'hover-on' : 'hover-off'}`} 
                         onMouseEnter={() => mediaEnterEffect()} 
                         onMouseLeave={() => mediaLeaveEffect()}>
                      <video id="home-video" playsInline muted loop >
                        <source src={item.Cover[0].url} type={item.Cover[0].mime} />
                      </video>
                    </div>
                  ) : (
                    <figure className={`hover-effect ${hoverStates ? 'hover-on' : 'hover-off'}`} 
                            onMouseEnter={() => mediaEnterEffect()} 
                            onMouseLeave={() => mediaLeaveEffect()}>
                      <img src={item.Cover[0].url} alt={item.Cover[0].name} />
                    </figure>
                  )}
                </a>
              </div>
            ) : null
          );
        })}
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
