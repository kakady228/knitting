import React from 'react';

import './CategoryButton.css';

export default function CategoryButton(props)
{
    return(
        <button onClick={props.onClick} className='CategoryButton'>{props.text || 'undefined text'}</button>
    );
}
