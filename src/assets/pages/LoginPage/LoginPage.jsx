import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(props)
{
    const {isLoggedIn, setIsLoggedIn} = props;
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(null);
    const [pass, setPass] = useState(null);

    const navigate = useNavigate();

    const loginHandler = () => {
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=login&login='+login+'&pass='+pass)
            .then(response => response.json())
            .then(r =>
            {
                setUser(r);
            });
    }

    useEffect(() => {
        if (user)
        {
            localStorage.setItem('user', JSON.stringify(user));
            setIsLoggedIn(true);
            navigate('/');
        }
        else
        {
            setIsLoggedIn(false);
        }

    }, [user]);

    return(
        <div className='LoginPage'>
            <h2 align='center'>Авторизация</h2>

            <div className="LoginPage-fields">
                <label htmlFor="login-field">Логин</label>
                <input onChange={(e) => setLogin(e.target.value)} id='login-field' type="text" className="LoginPage-login" />

                <label htmlFor="password-field">Пароль</label>
                <input onChange={(e) => setPass(e.target.value)} id="password-field" type="password" className="LoginPage-password" />
            </div>

            <div className="LoginPage-buttons">
                <button className="LoginPage-login-btn" onClick={() => loginHandler()}>Войти</button>
                <button className="LoginPage-reg-btn">Регистрация</button>
            </div>
        </div>
    );
}