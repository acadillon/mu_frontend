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
        axios
            .get("https://mu-backend.onrender.com//api/menu?populate[Works][populate]=Images")
            .then(({ data }) => {
                setMenulink(data.data.attributes.Works.data);
            })
            .catch((error) => setError(error));
    }, []);

    if (error) {
        return <div>An error occured: {error.message}</div>;
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
                            {menulinks.map(({ id, attributes }, index) => (
                                <Work
                                    key={index}
                                    title={attributes.Title}
                                    titleEN={attributes.TitleEN}
                                    customHtml={attributes.CustomHtml}
                                    poem={attributes.Poem}
                                    poemEN={attributes.PoemEN}
                                    body={attributes.Body}
                                    bodyEN={attributes.BodyEN}
                                    credit={attributes.Credit}
                                    sliderImages={attributes.Images.data}
                                    projectType={attributes.TypeDeProjet}
                                    projectTypeEN={attributes.TypeDeProjetEN}
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
