import React from 'react';
import LotCard from '../../helpers/LotCard/LotCard';

import './FavoritesPage.css';
import { Navigate } from 'react-router-dom';

export default function FavoritesPage()
{
    const user = localStorage.getItem('user');
    if (!user)
        return <Navigate to={"/login"} replace={true} />

    var lots = [];
    const storage_lots = JSON.parse(localStorage.getItem('favorited_lots')) || [];
    storage_lots.forEach(sl => {
        lots.push(JSON.parse(sl));
    });

    return(
        <>
            <h1 align='center'>Избранные мастер-классы</h1>
            <div className="FavoritesPage">
                {
                    lots && lots.map((lot, i)=> {
                        return (<LotCard key={i} img={lot.img} title={lot.title} type={lot.title} author={lot.author} difficulty={lot.difficulty} />)
                    })
                }
            </div>
        </>
    );
}