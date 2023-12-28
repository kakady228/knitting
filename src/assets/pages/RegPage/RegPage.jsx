import React, { useEffect, useState } from 'react';
import './RegPage.css';
import { useNavigate } from 'react-router-dom';

export default function RegPage(props)
{
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [login, setLogin] = useState(null);
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);

    const {isLoggedIn, setIsLoggedIn} = props;

    const navigate = useNavigate();

    const regHandler = () => {
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=regUser&firstName='+firstName+'&lastName='+lastName+'&login='+login+'&email='+email+'&pass='+pass)
            .then(() => {

                const user= 
                {
                    FirstName: firstName,
                    LastName: lastName,
                    description: null,
                    email: email,
                    login: login
                };

                localStorage.setItem('user', JSON.stringify(user));
                setIsLoggedIn(true);
                navigate('/');
            })
    }

    return(
        <div className='RegPage'>
            <h2 align='center'>Регистрация</h2>

            <div className="RegPage-fields">
                <label htmlFor="name-field">Имя</label>
                <input id='name-field' type="text" className="RegPage-name" onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="last-name-field">Фамилия</label>
                <input id="last-name-field" type="text" className="RegPage-last-name" onChange={(e) => setLastName(e.target.value)} />

                <label htmlFor="last-login">Логин</label>
                <input id="last-login" type="text" className="RegPage-login" onChange={(e) => setLogin(e.target.value)} />
                
                <label htmlFor="last-email">E-mail</label>
                <input id="last-email" type="text" className="RegPage-email" onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor="last-password">Пароль</label>
                <input id="last-password" type="password" className="RegPage-password" onChange={(e) => setPass(e.target.value)} />
            </div>

            <div className="RegPage-buttons">
                <button className="RegPage-reg-btn" onClick={() => regHandler()}>Зарегистрироваться</button>
            </div>
        </div>
    );
}