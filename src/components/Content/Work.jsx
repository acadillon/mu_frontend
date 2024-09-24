import React, { useRef, useEffect, useState, useContext } from 'react';
import DOMPurify from 'dompurify';
import Slider from '../Sliders/Slider';
import { LanguageContext } from '../Store/languageContext';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Import styles
import '../../assets/css/work.scss';

const Work = ({ title, titleEN, poem, poemEN, body, bodyEN, credit, sliderImages, projectType, projectTypeEN }) => {

    const { language } = useContext(LanguageContext);

    // ::: Reaveal :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const [isContentVisible, setIsContentVisible] = useState('false');
    const handleWorkClick = () => {
        setIsContentVisible(!isContentVisible);
    };

    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return (
        <div className={`accordeon-wrapper work`}>
            <button className={`title-container ${!isContentVisible ? 'active' : ''}`} onClick={handleWorkClick} >
                {language === 'fr' ? <h2 className='title-content'>{title}</h2> : <h2 className='title-content'>{titleEN}</h2>}
            </button>

            <div className={`answer-container ${!isContentVisible ? 'active' : ''}`}>
                {setIsContentVisible && language === 'fr' && body && (
                    <div className="accordeon-content">

                        {poem && poem.length > 0 && poem.map((paragraph, paragraphIndex) => (
                            <div className="body-p small-body" key={paragraphIndex}>
                                {paragraph.children.map((child, index) => (
                                    child.code ? (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(child.text) }} />
                                    ) : (
                                        <p className="desc-p" key={index}>{child.text}</p>
                                    )
                                ))}
                            </div>
                        ))}


                        {projectType && <div className="credit small-body">{projectType}</div>}

                        {body.map((paragraph, paragraphIndex) => (
                            <div className="body-p" key={paragraphIndex}>
                                {paragraph.children.map((child, index) => (
                                    child.code ? (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(child.text) }} />
                                    ) : (
                                        <p className="desc-p" key={index}>{child.text}</p>
                                    )
                                ))}
                            </div>
                        ))}

                        {credit && credit.length > 0 && (
                            <div>
                                <div className="credit small-body">
                                    <BlocksRenderer content={credit} />
                                </div>
                            </div>
                        )}

                        {sliderImages && (
                            <Slider images={sliderImages} />
                        )}
                    </div>
                )}
                {setIsContentVisible && language === 'en' && bodyEN && (
                    <div className="accordeon-content">

                        {poemEN && poemEN.length > 0 && poemEN.map((paragraph, paragraphIndex) => (
                            <div className="body-p small-body" key={paragraphIndex}>
                                {paragraph.children.map((child, index) => (
                                    child.code ? (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(child.text) }} />
                                    ) : (
                                        <p className="desc-p" key={index}>{child.text}</p>
                                    )
                                ))}
                            </div>
                        ))}

                        {projectTypeEN && <div className="credit small-body">{projectTypeEN}</div>}

                        {bodyEN.map((paragraph, paragraphIndex) => (
                            <div className="body-p small-body" key={paragraphIndex}>
                                {paragraph.children.map((child, index) => (
                                    child.code ? (
                                        <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(child.text) }} />
                                    ) : (
                                        <p className="desc-p" key={index}>{child.text}</p>
                                    )
                                ))}
                            </div>
                        ))}

                        {credit && credit.length > 0 && (
                            <div>
                                <div className="credit small-body">
                                    <BlocksRenderer content={credit} />
                                </div>
                            </div>
                        )}
                        {sliderImages && (
                            <Slider images={sliderImages} />
                        )}

                    </div>
                )}


            </div>
        </div>
    );
};

export default Work;


