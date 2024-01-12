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
                    <a href="https://t.me/where_is_jesus" target='_blank'><img style={{ width: 50 }}  src={tg_icon} alt="" /></a>
                    <a href="https://vk.com/where_is_jesus" target='_blank'><img style={{ width: 50 }}  src={vk_icon} alt="" /></a>
                </div>
            </div>
        );
    }
}

export default Footer;