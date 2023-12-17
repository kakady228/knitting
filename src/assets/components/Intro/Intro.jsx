import React from 'react';
import SearchBar from '../../helpers/SearchBar/SearchBar';

import './Intro.css';

class Intro extends React.Component
{
    render()
    {
        return (
            <div className="Intro" style={{ backgroundImage:`url(${this.props.background})`, backgroundRepeat:"no-repeat", backgroundSize: "100% auto" }}>
                <div className="Intro-content">
                    <div className='Intro-text'>{this.props.intro_text}</div>
                    <SearchBar style={{ marginBottom: '25px' }} />
                    <button className='Intro-search-btn'>Найти</button>
                </div>
            </div>
        );
    }
}

export default Intro;