import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './LotCard.css';

export default function LotCard(props)
{

    const add_favotrite = ()=>
    {
        var storage_lots = JSON.parse(localStorage.getItem('favorited_lots')) || [];
        let lot_for_storage =
        {
            id: props.id,
            author: props.author,
            difficulty: props.difficulty,
            img: props.img,
            title: props.title,
            type: props.type
        }
        
        if (Array.isArray(storage_lots) && storage_lots.length > 0)
        {
            let filtered_storage_lots = storage_lots.filter(el => el == JSON.stringify(lot_for_storage));
            if (filtered_storage_lots.length <= 0)
            {
                storage_lots.push(JSON.stringify(lot_for_storage));
                localStorage.setItem('favorited_lots', JSON.stringify(storage_lots));
            }
        }
        else
        {
            localStorage.setItem('favorited_lots', JSON.stringify([JSON.stringify(lot_for_storage)]));
        }
    }

    return(
        <div className='LotCard'>
            <img onClick={props.onClick} className='LotCard-main-img' src={props.img} alt="Изображение результата" />
            <div onClick={props.onClick} className="LotCard-text">
                <div className="LotCard-title">{props.title || 'Весенне гнёздышко'}</div>
                <div className="LotCard-description">
                    <div className="type">вязать: {props.type || 'крючком'}</div>
                    <div className="author">автор: {props.author || 'Natalia Erkhova'}</div>
                    <div className="difficulty">сложность: {props.difficulty || 'низкая'}</div>
                </div>
            </div>
            <button onClick={() => add_favotrite()} className="LotCard-favorite"><FavoriteBorderIcon /></button>
        </div>
    );
}
