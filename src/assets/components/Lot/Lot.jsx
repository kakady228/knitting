import React, { useEffect, useState } from 'react';
import lot_image from '../../icons/lot_image.png';

import './Lot.css';
import LotCard from '../../helpers/LotCard/LotCard';
import { useNavigate } from 'react-router-dom';

export default function Lot()
{
    const [lots, setLots] = useState();

    const navigate = useNavigate();
    const handleRoute = () => navigate('/lot');

    useEffect(()=>{
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=getSomeLots')
            .then(response => response.json())
            .then(r =>
            {
                setLots(r);
            });
    }, [undefined]);
    
    var counter = 0;

    return(
        <div className="Lot">
            {
                lots && lots.map((lot, i)=> {
                    return (<LotCard onClick={handleRoute} key={i} img={lot.link} title={lot.title} type={lot.title} author={lot.author} difficulty={lot.difficulty} />)
                })
            }
        </div>
    );
}