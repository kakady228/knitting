import React, { useEffect, useState } from 'react';

import './LotPage.css';

export default function LotPage(props)
{
    const default_lot_id = 1;
    const [lot, setLot] = useState();

    useEffect(()=>{
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=getCurrentLot&id_Lot='+(props.id_Lot || default_lot_id))
            .then(response => response.json())
            .then(r =>
            {
                if (r.length > 0)
                {
                    setLot(r[0]);
                }
            });
    }, [undefined]);

    return(
        <div className="LotPage">
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>{lot?.title || 'Весеннее гнёздышко'}</h1>
            <div className="LotPage-main">
                <div className="LotPage-main-img">
                    <img src={lot?.link} />
                    <div className="type">вязать: {lot?.type || 'крючком'}</div>
                    <div className="author">автор: {lot?.author || 'Natalia Erkhova'}</div>
                    <div className="difficulty">сложность: {lot?.difficulty || 'низкая'}</div>
                </div>

                <div className="LotPage-main-img">
                    <img src={lot?.link2} />
                    <span>Условные обозначения</span>
                    <div className="type">вязать: {lot?.type || 'крючком'}</div>
                    <div className="author">автор: {lot?.author || 'Natalia Erkhova'}</div>
                    <div className="difficulty">сложность: {lot?.difficulty || 'низкая'}</div>
                </div>
                <div className="LotPage-main-img">
                    <img src={lot?.link3} />
                    <span>Материалы</span>
                    <div className="type">вязать: {lot?.type || 'крючком'}</div>
                    <div className="author">автор: {lot?.author || 'Natalia Erkhova'}</div>
                    <div className="difficulty">сложность: {lot?.difficulty || 'низкая'}</div>
                </div>
            </div>

            
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>{'Описание'}</h1>
            <div className="LotPage-description">
                
            </div>
        </div>
    );
}