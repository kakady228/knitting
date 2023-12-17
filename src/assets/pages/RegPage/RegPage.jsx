import React from 'react';
import './RegPage.css';

export default function RegPage()
{

    return(
        <div className='RegPage'>
            <h2 align='center'>Регистрация</h2>

            <div className="RegPage-fields">
                <label htmlFor="name-field">Имя</label>
                <input id='name-field' type="text" className="RegPage-name" />

                <label htmlFor="last-name-field">Фамилия</label>
                <input id="last-name-field" type="text" className="RegPage-last-name" />

                <label htmlFor="last-login">Логин</label>
                <input id="last-login" type="text" className="RegPage-login" />
                
                <label htmlFor="last-email">E-mail</label>
                <input id="last-email" type="text" className="RegPage-email" />
                
                <label htmlFor="last-password">Пароль</label>
                <input id="last-password" type="password" className="RegPage-password" />
            </div>

            <div className="RegPage-buttons">
                <button className="RegPage-reg-btn">Зарегистрироваться</button>
            </div>
        </div>
    );
}