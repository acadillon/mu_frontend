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
            .get("http://localhost:1337/api/actualites?populate=*")
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
            const category = actu.attributes.category.data.attributes.Name;
            if (grouped[category]) {
                grouped[category].push(actu);
            } else {
                grouped[category] = [actu];
            }
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
                    {actus.map(({ id, attributes }, index) => (
                        <Actu
                            key={index}
                            title={attributes.Title}
                            titleEN={attributes.TitleEN}
                            body={attributes.Body}
                            bodyEN={attributes.BodyEN}
                            link={attributes.Link}
                            linkText={attributes.LinkText}
                            image={attributes.Image.data}
                        />

                    ))}

                </div>
            ))}
        </>
    );
};

export default Actus;