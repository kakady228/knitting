import React from 'react';

import './CategoryButton.css';

class CategoryButton extends React.Component
{
    render()
    {
        return(
            <button className='CategoryButton'>{this.props.text || 'undefined text'}</button>
        );
    }
}

export default CategoryButton;