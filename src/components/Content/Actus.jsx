import React, { useEffect, useState } from 'react';
import axios from "axios";
import Actu from './Actu';

// Import styles
import '../../assets/css/actus.scss';


const Actus = ({ isActive, onClick }) => {

    // *** GET ACTUS ******************************************************************
    // ********************************************************************************
    const [actus, setActus] = useState([]);
    const [error, setError] = useState(null);


    // ** Datas actu
    useEffect(() => {
        // Fetch des actualites
        axios
            .get("https://railwayapp-strapi-production-540e.up.railway.app/api/actualites?populate=*")
            .then(({ data }) => {
                setActus(data.data);
            })
            .catch((error) => setError(error));
    }, []);


    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    // ********************************************************************************



    // Fonction pour regrouper les actualités par catégorie
    const groupByCategory = () => {
        const grouped = {};
        actus.forEach((actu) => {
            if (!actu.category) {
                const category = 'Sans catégorie';
                if (!grouped[category]) {
                    grouped[category] = [];
                }
                grouped[category].push(actu);
                return;
            }
            
            const category = actu.category.Name;
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(actu);
        });
        return grouped;
    };

    const groupedActus = groupByCategory();

    // ::: Event :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    return (
        <>
            {Object.entries(groupedActus).map(([category, actus]) => (
                <div key={category} className='actus-cat--wrapper'>
                    <h2 className='header-body'>{category}</h2>
                    {actus.map((actu) => (
                        <Actu
                            key={actu.id}
                            title={actu.Title}
                            titleEN={actu.TitleEN}
                            body={actu.Body}
                            bodyEN={actu.BodyEN}
                            link={actu.Link}
                            linkText={actu.LinkText}
                            image={actu.Image}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};

export default Actus;