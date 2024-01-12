import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import './LotCard.css';

export default function LotCard(props)
{

    const add_favotrite = () =>
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

    const remove_favorite = () =>
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
        };

        if (Array.isArray(storage_lots) && storage_lots.length > 0)
        {
            console.log(111);
            for (let i = 0; i < storage_lots.length; i++) {
                let el = JSON.parse(storage_lots[i]);
                if (el.id === lot_for_storage.id) {
                    storage_lots.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem('favorited_lots', JSON.stringify(storage_lots));
            window.location.reload();
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
            <button onClick={() => props.favorites_page ? remove_favorite() : add_favotrite()} className="LotCard-favorite">{props.favorites_page ? <FavoriteIcon /> : <FavoriteBorderIcon />}</button>
        </div>
    );
}
