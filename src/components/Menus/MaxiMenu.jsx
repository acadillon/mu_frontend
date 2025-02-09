import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import Work from '../Content/Work';
import AaMenu from '../Content/AaMenu';


// Import styles
import '../../assets/css/maximenu.scss';

const MaxiMenu = ({ }) => {

    // *** GET WORKS ******************************************************************
    // ********************************************************************************
    const [error, setError] = useState(null);
    const [menulinks, setMenulink] = useState([]);



    useEffect(() => {
        // Fetch des projets ordonnés à partir du menu
        const API_URL = "https://railwayapp-strapi-production-540e.up.railway.app/api/works?populate=*";
        
        axios
            .get(API_URL)
            .then(({ data }) => {
                if (data && data.data) {
                    setMenulink(data.data);
                } else {
                    setError(new Error("Format de données invalide"));
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données:", error);
                setError(error);
            });
    }, []);

    if (error) {
        return (
            <div className="error-message">
                Une erreur est survenue: {error.message}
                <br />
                Veuillez réessayer ultérieurement.
            </div>
        );
    }
    // ********************************************************************************




    return (
        <>
            <div className='maximenu-wrapper' id='maximenu'>
                <div className={`maximenu`}>
                    <div>
                        <AaMenu />
                        <div>
                            {error && <p>Error fetching works: {error.message}</p>}
                            {menulinks.map((work, index) => (
                                <Work
                                    key={index}
                                    title={work.Title}
                                    titleEN={work.TitleEN}
                                    poem={work.Poem}
                                    poemEN={work.PoemEN}
                                    body={work.Body}
                                    bodyEN={work.BodyEN}
                                    credit={work.Credit}
                                    sliderImages={work.Images}
                                    projectType={work.TypeDeProjet}
                                    projectTypeEN={work.TypeDeProjetEN}
                                />
                            ))}
                        </div>
                        <div id="mu" className='footer'>
                            <p>MU production •2023</p>
                            <p>Web design and development: Alice CADILLON</p>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default MaxiMenu;
