import React, { useEffect, useState } from 'react';

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

    return(
        <div className="Lot">
            {
                lots && lots.map((lot, i)=> {
                    return (<LotCard onClick={handleRoute} key={i} id={lot.id} author={lot.author} difficulty={lot.difficulty} img={lot.link} title={lot.title} type={lot.type} />)
                })
            }
        </div>
    );
}