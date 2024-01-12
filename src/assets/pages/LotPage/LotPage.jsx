import React, { useEffect, useState } from 'react';

import './LotPage.css';
import autosize from 'autosize';

export default function LotPage(props)
{
    const default_lot_id = window.localStorage.getItem('id_current_lot') || 1;
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
                    <div className="type">
                        <textarea style={{
                            width: '330px', height: 150, overflow: 'hidden'
                            ,overflowY: 'auto', resize: 'none', padding: 5
                            ,border: 'none', backgroundColor: 'inherit'
                        }}
                        value={lot?.uo} />
                    </div>
                </div>
                <div className="LotPage-main-img">
                    <img src={lot?.link3} />
                    <span>Материалы</span>
                        <textarea style={{
                            width: '330px', height: 150, overflow: 'hidden'
                            ,overflowY: 'auto', resize: 'none', padding: 5
                            ,border: 'none', backgroundColor: 'inherit'
                        }}
                        value={lot?.material} />
                </div>
            </div>

            
            <h1 style={{ textAlign: 'center', width: '100%' }}>{'Описание'}</h1>
            <div className="LotPage-description">
                
                <div className='LotPage-description-item'>
                    <textarea style={{
                        width: 700, height: 150, overflow: 'hidden'
                        ,overflowY: 'auto', resize: 'none', padding: 5
                        ,border: 'none', backgroundColor: 'inherit'
                    }}
                    value={lot?.description} />

                    <img style={{ width: 300, height: 300 }} src={lot?.link4} />
                </div>
            </div>
        </div>
    );
}