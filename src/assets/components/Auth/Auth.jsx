import React, { useEffect } from 'react';

export default function Auth(props)
{
    const {isLoggedIn, setIsLoggedIn, user} = props;
    useEffect(() => {
        // Проверяем, есть ли уже сохраненный токен в localStorage
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        // Отправляем запрос на сервер для аутентификации пользователя
        // Если аутентификация прошла успешно, то сохраняем токен в localStorage
        // и устанавливаем соответствующий статус
        localStorage.setItem('user', '{"id":"2","FirstName":"test","LastName":"test","email":"test@test.test","description":null,"login":"test"}');
        setIsLoggedIn(true);

        const user = localStorage.getItem('user');

        if (user)
            console.log(JSON.parse(user));
    };

    const handleLogout = () => {
        // Удаляем токен из localStorage и устанавливаем соответствующий статус
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <div>
        {isLoggedIn? (
            <button onClick={handleLogout}>Logout</button>
        ) : (
            <button onClick={handleLogin}>Login</button>
        )}
        </div>
    );
}