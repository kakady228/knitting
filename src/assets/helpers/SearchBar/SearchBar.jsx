import React from 'react';

import './SearchBar.css';

class SearchBar extends React.Component
{
    render()
    {
        return (
            <input style={this.props.style || ''} placeholder={this.props.placeholder || 'Что хотите связать?'} className='SearchBar-input' type="text" />
        );
    }
}

export default SearchBar;