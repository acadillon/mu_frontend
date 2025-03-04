import React, { useState, useContext } from 'react';

import { LanguageContext } from '../Store/languageContext';

const Actu = ({ title, titleEN, body, bodyEN, link, linkText, image }) => {

    const [actuHoverStates, setActuHoverStates] = useState(null);
    const { language } = useContext(LanguageContext);

    const actuEnterEffect = () => {
        setActuHoverStates(true);
    };
    const actuLeaveEffect = () => {
        setActuHoverStates(false);
    };

    return (

        <div className={`actu-teaser`} onMouseEnter={() => actuEnterEffect()} onMouseLeave={() => actuLeaveEffect()}>
            {image && (
                <div className={`actu-img hover-effect ${image ? 'w-img' : ''} ${actuHoverStates === true ? 'hover-on' : (actuHoverStates === false ? 'hover-off' : '')}`}>
                    <img
                        src={image.formats?.small?.url || image.url}
                        alt={image.name}
                    />
                </div>
            )}

            <div className="actu-ttl--wrap">
                {language === 'fr' ? <h3 className='header-body'>{title}</h3> : <h3 className='header-body'>{titleEN}</h3>}

                {link && (
                    <a href={link} target='_blanck' className='header-body'>{linkText} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className='arrow-ext'><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg></a>
                )}
            </div>

            {language === 'fr' && body && Array.isArray(body) && body.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex}>
                    {paragraph.children.map((child, index) => (
                        <p key={index} className='small-body'>{child.text}</p>
                    ))}
                </div>
            ))}
            {language === 'en' && bodyEN && Array.isArray(bodyEN) && bodyEN.map((paragraph, paragraphIndex) => (
                <div key={paragraphIndex}>
                    {paragraph.children.map((child, index) => (
                        <p key={index} className='small-body'>{child.text}</p>
                    ))}
                </div>
            ))}




        </div>
    );
};

export default Actu;
