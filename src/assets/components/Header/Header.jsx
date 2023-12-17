import React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header(props)
{
    const navigate = useNavigate();
    const handleRoute = () => navigate('/');
    const handleNavigateFavorites = () => navigate('/favorites');
    const handleNavigateProfile = () => navigate('/profile');

    return (
        <div className="Header">
            <div className="Header-logo" onClick={handleRoute}>
                <img className='Header-logo-img' src={props.logo} alt="Nitochka.ru" />
                <img className='Header-logo-img_text' src={props.logo_text} alt="" />
            </div>
            <div className="Header-buttons">
                <button onClick={handleNavigateFavorites}><FavoriteBorderIcon /></button>
                <button onClick={handleNavigateProfile}><AccountCircleOutlinedIcon /></button>
            </div>
        </div>
    );
}