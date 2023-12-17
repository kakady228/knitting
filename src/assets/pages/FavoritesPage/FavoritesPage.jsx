import React, { useEffect, useState } from 'react';
import LotCard from '../../helpers/LotCard/LotCard';

import './FavoritesPage.css';
import { Navigate } from 'react-router-dom';

export default function FavoritesPage()
{
    const [lots, setLots] = useState();

    useEffect(()=>{
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=getSomeLots&count=6')
            .then(response => response.json())
            .then(r =>
            {
                setLots(r);
            });
    }, [undefined]);

    const user = localStorage.getItem('user');
    if (!user)
        return <Navigate to={"/login"} replace={true} />

    return(
        <>
            <h1 align='center'>Избранные мастер-классы</h1>
            <div className="FavoritesPage">
                {
                    lots && lots.map((lot, i)=> {
                        return (<LotCard key={i} img={lot.link} title={lot.title} type={lot.title} author={lot.author} difficulty={lot.difficulty} />)
                    })
                }
            </div>
        </>
    );
}