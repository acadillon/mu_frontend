import { useRef, useContext } from "react";
import { LanguageContext } from '../Store/languageContext';


// Import styles
import '../../assets/css/header.scss';
const Header = () => {

  const ref = useRef();
  const { language, setLanguage } = useContext(LanguageContext);

  const switchToEnglish = () => {
    setLanguage('en');
  };

  const switchToFrench = () => {
    setLanguage('fr');
  };

  return (
    <>

      <a href="#maximenu" className="sticky-link"></a>
      <div className="sticky-white-top"></div>
      <div className="sticky-object header-body" id="Marion" ref={ref}>
        Marion Gassin,  
      </div>
      {/* <div className="sticky-object header-body" id="Mu" ref={ref}>
        Mû
      </div> */}
      <div className="sticky-object header-body" id="Prodiff">

        <div>
          Mû ~ 
          Production
          <div id="Diff">
            <span id="and">&</span>
            <br></br>
            {language === 'en' ? 'Distribution of ' : 'Diffusion des'}
          </div>
        </div>
      </div>
      <div className="sticky-object header-body" id="Art">
        {language === 'en' ? 'Choreographic Arts' : 'Arts chorégraphiques'}
      </div>


      <header>

        <div className="menu-wrapper">
          <button className={`header-body ${language === 'en' ? 'lang-on' : '' }`} onClick={switchToEnglish}>En</button>
          <button className={`header-body ${language === 'fr' ? 'lang-on' : '' }`} onClick={switchToFrench}>Fr</button>
        </div>
      </header>

    </>
  );
};

export default Header;