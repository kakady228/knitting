import React from 'react';
import tg_icon from '../../icons/tg_icon.svg';
import vk_icon from '../../icons/vk_icon.svg';

import './Footer.css';

class Footer extends React.Component
{
    render()
    {
        return (
            <div className="Footer">
                <div className="Footer-images">
                    <img style={{ width: 50 }} src={tg_icon} alt="" />
                    <img style={{ width: 50 }}  src={vk_icon} alt="" />
                </div>
            </div>
        );
    }
}

export default Footer;