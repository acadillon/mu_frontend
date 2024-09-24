import React, { useState, useEffect, useRef } from 'react';
// import Swiper core and required modules
import { Navigation, Keyboard, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import '../../assets/css/sliders.scss';
import '../../assets/css/hover-effect.scss';

const Slider = ({ images }) => {

  const [hoverStates, setHoverStates] = useState(Array(images.length).fill(false));
  const swiperWrapperRef = useRef(null);

  // *** HOVER EFFECT ***************************************************
  const mediaHoverEffect = (index) => {
    console.log(index);
    const updatedHoverStates = Array(images.length).fill(false); // Réinitialiser tous les états à false
    updatedHoverStates[index] = true; // Définir l'état de l'élément actif à true

    // Mettre en pause et réinitialiser toutes les vidéos sauf celle de l'élément actif
    for (let i = 0; i < images.length; i++) {
      if (i !== index) {
        const video = document.getElementById(`video-${i}`);
        if (video) {
          setTimeout(() => {
            video.pause();
            // video.currentTime = 0;
          }, 200);
        }
      }
    }

    // Lancer la vidéo de l'élément actif après une pause
    setTimeout(() => {
      const video = document.getElementById(`video-${index}`);
      if (video) {
        video.play();
      }
    }, 200);

    setHoverStates(updatedHoverStates);
  };


  useEffect(() => {
    mediaHoverEffect(0);
  }, []);


  const sliderEnterEffect = () => {
    const swiperWrapper = swiperWrapperRef.current;
  
  
    if (swiperWrapper) {
      const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
      let activeSlideIndex = -1;
      swiperSlides.forEach((slide, index) => {
        if (slide.classList.contains('swiper-slide-active')) {
          activeSlideIndex = index;
        }
      });
      if (activeSlideIndex !== -1) {
        mediaHoverEffect(activeSlideIndex);
      }
    }
  };



  return (
    <>
      <div className='swiper--wrapper' ref={swiperWrapperRef} onMouseLeave={() => setHoverStates(Array(images.length).fill(false))} onMouseEnter={() => sliderEnterEffect()}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Keyboard, A11y]}
          spaceBetween={10}
          navigation={true}
          keyboard={{
            enabled: true,
          }}
          slidesPerView={'auto'}
          onInit={(swiper) => {
            // no arrow if less then 2 slides
            const totalSlides = swiper.slides.length;
            if (totalSlides <= 2 ) {
              swiper.navigation.nextEl.classList.add('swiper-button-hide');
            } else {
              swiper.navigation.nextEl.classList.remove('swiper-button-hide');
            }
          }}
          onSlideChange={(swiper) => {
            const indexCurrentSlide = swiper.realIndex;
            const totalSlides = swiper.slides.length; // Nombre total de slides
        
            mediaHoverEffect(indexCurrentSlide);
      
            if (indexCurrentSlide === totalSlides - 1 ) {
              swiper.navigation.nextEl.classList.add('swiper-button-hide');
            } else {
              swiper.navigation.nextEl.classList.remove('swiper-button-hide');
            }
          }}
          onReachEnd={() => {
            const indexLastSlide = Array(images.length) - 1;
            mediaHoverEffect(indexLastSlide);
          }}

        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              {image.attributes.mime.startsWith('video/') ? (
                <div className={`video-wrap hover-effect ${hoverStates[index] ? 'hover-on' : 'hover-off'}`}>
                  <video id={`video-${index}`} playsInline muted loop>
                    <source src={'http://localhost:1337/' + image.attributes.url} type={image.attributes.mime} />
                  </video>
                  <div className="video-caption small-body">{image.attributes.caption}</div>
                </div>
              ) : (
                <figure className={`hover-effect ${hoverStates[index] ? 'hover-on' : 'hover-off'}`}>
                  <img src={'http://localhost:1337/' + image.attributes.url} alt={image.attributes.name} />
                  <figcaption className='small-body'>{image.attributes.caption}</figcaption>
                </figure>
              )}
            </SwiperSlide>
          ))} 
          <SwiperSlide className='last-slide'/>
        </Swiper>
      </div>
    </>
  );

};

export default Slider;