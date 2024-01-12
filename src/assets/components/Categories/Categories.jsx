import React from 'react';

import './Categories.css';
import CategoryButton from '../../helpers/CategoryButton/CategoryButton';
import { useNavigate } from 'react-router-dom';

export default function Categories()
{
    const navigate = useNavigate();
    const handleRoute = () => navigate('/favorites');
    return(
        <div className="Categories">
            <CategoryButton onClick={handleRoute} text="Вязание на спицах" />
            <CategoryButton onClick={handleRoute} text="Вязание на вилке" />
            <CategoryButton onClick={handleRoute} text="Вязание крючком" />
            <CategoryButton onClick={handleRoute} text="Машинное вязание" />
        </div>
    );
}