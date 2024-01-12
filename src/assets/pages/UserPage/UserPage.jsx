import React, { useEffect, useState } from 'react';

import './UserPage.css';
import { Navigate, useNavigate } from 'react-router-dom';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import edit_icon from '../../icons/edit_icon.svg';

export default function UserPage(props)
{
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    
    const [newLogin, setNewLogin] = useState('');
    const [pass, setPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [userDesc, setUserDesc] = useState(JSON.parse(window.localStorage.getItem('user'))?.description || '');

    const navigate = useNavigate();
    const handleRoute = () => navigate('/add_lot');

    const handleSave = () =>
    {
        let data = {
            id: JSON.parse(window.localStorage.getItem('user')).id,
            image: null,
            description: userDesc
        };

        fetch('http://space12490.temp.swtest.ru/api/index.php?action=saveUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    useEffect(() => {

        const objectUrl = selectedFile ? URL.createObjectURL(selectedFile) : undefined;
        
        if (selectedFile)
            setPreview(objectUrl);
        else                
            setPreview(undefined);
        
        return () => objectUrl && URL.revokeObjectURL(objectUrl);

    }, [selectedFile]);

    const onChange = (e) =>
    {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile(undefined);
        else
            setSelectedFile(e.target.files[0]);
    }

    const [lots, setLots] = useState();

    useEffect(()=>{
        fetch('http://space12490.temp.swtest.ru/api/index.php?action=getSomeLots&count=3')
            .then(response => response.json())
            .then(r =>
            {
                setLots(r);
            });
    }, [undefined]);

    var user = null;
    const storageUser = localStorage.getItem('user');
    if (!storageUser)
        return <Navigate to={"/login"} replace={true} />
    else
        user = JSON.parse(storageUser);

    const handleExit = () => {
        if (storageUser)
        {
            localStorage.removeItem('user');
            window.location.reload();
        }
    }

    return(
        <div className="UserPage">
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>{user.FirstName + ' ' + user.LastName || 'Исмагилова Аделина'}</h1>

            <div className="UserPage-user_info">
                
                <div
                    className="UserPage-image"
                    style={{ background: (user.image && user.image != 'http://space12490.temp.swtest.ru/api/images/') || preview ? 'url('+user.image || preview+')' : '#D1D1D1' }}
                    onClick={() => { let input = document.querySelector('#user-image-1'); input.click();
                }}>
                    {(user.image && user.image != 'http://space12490.temp.swtest.ru/api/images/') || preview ? '' : <span>Добавить фото профиля</span>}
                    <input id="user-image-1" onChange={onChange} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>

                <div className='UserPage-user_info_text'>
                    <span>Логин: {user.login || 'where_is_jesus'}<img onClick={() => open ? setOpen(false) : setOpen(true)} style={{ marginLeft: 10, cursor: 'pointer' }} src={edit_icon} /></span>
                    <span>E-mail: {user.email || 'nitrogen22365@gmail.com'}<img onClick={() => open ? setOpen2(false) : setOpen2(true)} style={{ marginLeft: 10, cursor: 'pointer' }} src={edit_icon} /></span>
                    <span>Пароль: {'********'}<img onClick={() => open ? setOpen3(false) : setOpen3(true)} style={{ marginLeft: 10, cursor: 'pointer' }} src={edit_icon} /></span>
                    <span>{'О себе:'}</span>
                    <textarea onChange={(e) => setUserDesc(e.target.value)} value={userDesc || ''} placeholder='Напишите что-нибудь о себе' style={{ height: 100, borderRadius: 10, border: '1px solid #000' }} />
                </div>
            
            </div>

            <div className="UserPage-edit_buttons">
                <button onClick={handleExit} className="UserPage-exit_btn">Выход</button>
                <button onClick={() => handleSave()} className="UserPage-save_btn">Сохранить</button>
            </div>

            <div className="UserPage-lots">
                <FavoritesPage />
            </div>

            <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
                <button onClick={handleRoute} className="UserPage-add_btn">Добавить мастер-класс</button>
            </div>
            <CustomDialog open={open} setOpen={setOpen} label1={'Новый логин'} val1={newLogin} setVal1={setNewLogin} label2={'Пароль'} val2={pass} setVal2={setPass} type2='password' />
            <CustomDialog open={open2} setOpen={setOpen2} label1={'Новый e-mail'} label2={'Пароль'} val1={newEmail} setVal1={setNewEmail} type1='email' val2={pass} setVal2={setPass} type2='password' />
            <CustomDialog open={open3} setOpen={setOpen3} label1={'Новый пароль'} label2={'Старый пароль'} val1={newPass} setVal1={setNewPass} type1='password' val2={pass} setVal2={setPass} type2='password' />
            
        </div>
    );
}