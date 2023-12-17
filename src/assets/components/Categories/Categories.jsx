import React from 'react';

import './Categories.css';
import CategoryButton from '../../helpers/CategoryButton/CategoryButton';

class Categories extends React.Component
{
    render()
    {
        return(
            <div className="Categories">
                <CategoryButton text="Вязание на спицах" />
                <CategoryButton text="Вязание на вилке" />
                <CategoryButton text="Вязание крючком" />
                <CategoryButton text="Машинное вязание" />
            </div>
        );
    }
}

export default Categories;