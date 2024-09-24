import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from "axios";
import Actus from './Actus';

import { LanguageContext } from '../Store/languageContext';

// Import styles
import '../../assets/css/aamenu.scss';

const AaMenu = ({ isActive, onClick }) => {

    // *** GET ABOUT ******************************************************************
    // ********************************************************************************
    const [abouts, setAbouts] = useState([]);
    // const [actus, setActus] = useState([]);
    const [error, setError] = useState(null);
    const [aboutActive, setAboutActive] = useState(false);
    const [actusActive, setActusActive] = useState(false);
    const [isOnDisplay, setisOnDisplay] = useState(false);
    const { language } = useContext(LanguageContext);


    // ** Datas about
    useEffect(() => {
        // Fetch des about
        axios
            .get("http://localhost:1337/api/abouts")
            .then(({ data }) => {
                setAbouts(data.data);
            })
            .catch((error) => setError(error));
    }, []);


    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    // ********************************************************************************
    const [actus, setActus] = useState([]);
    // ** Datas actu
    useEffect(() => {
        // Fetch des actualites
        axios
            .get("http://localhost:1337/api/actualites?populate=*")
            .then(({ data }) => {
                setActus(data.data);
            })
            .catch((error) => setError(error));
    }, []);

    // ::: Event :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // ::: Show About
    const handleAboutClick = async () => {
        if (!aboutActive && !actusActive) {
            setAboutActive(true);
            setActusActive(false);
            setisOnDisplay(true);
        } else if (!aboutActive && actusActive) {
            setAboutActive(true);
            setActusActive(false);
        } else if (aboutActive) {
            setisOnDisplay(false);
            setTimeout(() => {
                setAboutActive(false);
            }, 1000);
        }
    };
    // ::: Show Actus
    const handleActusClick = async () => {
        if (!aboutActive && !actusActive) {
            setActusActive(true);
            setAboutActive(false);
            setisOnDisplay(true);
        } else if (aboutActive && !actusActive) {
            setActusActive(true);
            setAboutActive(false);
        } else if (actusActive) {
            setisOnDisplay(false);
            setTimeout(() => {
                setActusActive(false);
            }, 1000);
        }
    };
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // ::: CSS Classes :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const wrapperClasses = `aa-ctnt--wrapper ${isOnDisplay ? 'active' : ''}`;
    const aboutClasses = `fade-in-about ${aboutActive ? 'fade-in' : 'fade-out'}`;
    const actusClasses = `fade-in-actus ${actusActive ? 'fade-in' : 'fade-out'}`;
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return (

        <div className="aa-wrapper">
            <div className="aa-btn--wrapper">
                <button className={`title-container title-big-body ${aboutActive ? 'active' : ''} `} onClick={handleAboutClick} >
                    {language === 'en' ? <h2 className='title-content'>About</h2> : <h2 className='title-content'>À propos</h2>}
                </button>
                {actus.length > 0 && (
                    <button className={`title-container title-big-body ${actusActive ? 'active' : ''}`} onClick={handleActusClick} >
                        {language === 'en' ? <h2 className='title-content'>News</h2> : <h2 className='title-content'>Actualités</h2>}
                    </button>
                )}
            </div>
            <div className={wrapperClasses}>
                <div className={`${aboutClasses} ${aboutActive ? 'active' : ''}`}>
                    {aboutActive && (
                        <div className="answer-aa">
                            {abouts.map(({ id, attributes }, index) => (
                                <div key={index} className='about-wrap'>
                                    <div className="about-body">

                                        {language === 'fr' && attributes.Body.map((paragraph, index) => (
                                            <p key={index}>{paragraph.children[0].text}</p>
                                        ))}
                                        {language === 'en' && attributes.BodyEN.map((paragraph, index) => (
                                            <p key={index}>{paragraph.children[0].text}</p>
                                        ))}
                                    </div>
                                    <div className="about-bio small-body">
                                        {language === 'fr' && attributes.Bio.map((paragraph, index) => (
                                            <p key={index}>{paragraph.children[0].text}</p>
                                        ))}
                                        {language === 'en' && attributes.BioEN.map((paragraph, index) => (
                                            <p key={index}>{paragraph.children[0].text}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`${actusClasses} ${actusActive ? 'active' : ''}`}>
                    {actusActive && (
                        <div className="answer-aa actu-content">
                            <Actus />
                        </div>
                    )}
                </div>


            </div>
        </div>


    );
};

export default AaMenu;