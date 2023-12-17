import React, {useState, useEffect} from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import './LotCard.css';

export default function LotCard(props)
{
    return(
        <div className='LotCard' onClick={props.onClick}>
            <img className='LotCard-main-img' src={props.img} alt="Изображение результата" />
            <div className="LotCard-text">
                <div className="LotCard-title">{props.title || 'Весенне гнёздышко'}</div>
                <div className="LotCard-description">
                    <div className="type">вязать: {props.type || 'крючком'}</div>
                    <div className="author">автор: {props.author || 'Natalia Erkhova'}</div>
                    <div className="difficulty">сложность: {props.difficulty || 'низкая'}</div>
                </div>
            </div>
            <button className="LotCard-favorite"><FavoriteBorderIcon /></button>
        </div>
    );
}
