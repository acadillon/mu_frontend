import React, { useRef, useEffect, useState, useContext } from 'react';
import DOMPurify from 'dompurify';
import Slider from '../Sliders/Slider';
import { LanguageContext } from '../Store/languageContext';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Import styles
import '../../assets/css/work.scss';

const ArrowExt = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='arrow-ext'>
        <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
    </svg>
);

const renderBodyChild = (child, index) => {
    if (child.type === 'link') {
        const linkText = child.children?.map((c) => c.text).join('') || '';
        return (
            <a key={index} href={child.url} target='_blanck' className='body-p' style={{ margin: '0px', textUnderlineOffset: '3px' }}>
                {linkText} <ArrowExt />
            </a>
        );
    }
    if (child.code) {
        return <span key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(child.text) }} />;
    }
    return <span key={index}>{child.text}</span>;
};

const renderBodyParagraph = (paragraph, paragraphIndex, paragraphClassName = 'body-p') => {
    const hasContent = paragraph.children?.some(
        (child) => child.type === 'link' || child.text?.trim()
    );
    if (!hasContent) return null;

    return (
        <div className={paragraphClassName} key={paragraphIndex}>
            <p className="desc-p">
                {paragraph.children.map((child, index) => renderBodyChild(child, index))}
            </p>
        </div>
    );
};

const Work = ({ title, titleEN, poem, poemEN, body, bodyEN, credit, sliderImages, projectType, projectTypeEN, youtube }) => {

    const { language } = useContext(LanguageContext);

    // ::: Reaveal :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        const handleStickyLinkClick = () => {
            // Forcer la fermeture
            setIsContentVisible(false);
        };

        const stickyLink = document.querySelector('.sticky-link');
        stickyLink?.addEventListener('click', handleStickyLinkClick);

        return () => {
            stickyLink?.removeEventListener('click', handleStickyLinkClick);
        };
    }, []);

    const handleWorkClick = () => {
        setIsContentVisible(!isContentVisible);
    };

    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    return (
        <div className={`accordeon-wrapper work`}>
            <button className={`title-container ${isContentVisible ? 'active' : ''}`} onClick={handleWorkClick} >
                {language === 'fr' ? <h2 className='title-content'>{title}</h2> : <h2 className='title-content'>{titleEN}</h2>}
            </button>

            <div className={`answer-container ${isContentVisible ? 'active' : ''}`}>
                {true && language === 'fr' && (
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

                        {body && body.map((paragraph, paragraphIndex) => renderBodyParagraph(paragraph, paragraphIndex))}

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
                        {youtube && (
                            <div className="youtube-container">
                                <iframe src={youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        )}
                    </div>
                )}
                {true && language === 'en' && (
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

                        {bodyEN && bodyEN.map((paragraph, paragraphIndex) => renderBodyParagraph(paragraph, paragraphIndex, 'body-p small-body'))}

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


