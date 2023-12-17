import React, { useEffect, useState } from 'react';

import './UserPage.css';
import LotCard from '../../helpers/LotCard/LotCard';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UserPage(props)
{
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const navigate = useNavigate();
    const handleRoute = () => navigate('/add_lot');

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

    return(
        <div className="UserPage">
            <h1 style={{ marginLeft: 'auto', marginRight: 'auto' }}>{user.FirstName + ' ' + user.LastName || 'Исмагилова Аделина'}</h1>

            <div className="UserPage-user_info">
                
                <div
                    className="UserPage-image"
                    style={{ background: user.image || preview ? 'url('+user.image || preview+')' : '#D1D1D1' }}
                    onClick={() => { let input = document.querySelector('#user-image-1'); input.click();
                }}>
                    {preview ? '' : <span>Добавить фото профиля</span>}
                    <input id="user-image-1" onChange={onChange} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>

                <div className='UserPage-user_info_text'>
                    <span>Логин: {user.login || 'where_is_jesus'}</span>
                    <span>E-mail: {user.email || 'nitrogen22365@gmail.com'}</span>
                    <span>Пароль: {'********'}</span>
                    <span>{'О себе:'}</span>
                    <textarea value={user.description || 'Балуюсь вязанием, перманентно эмоционально неустойчива'} style={{ height: 100, borderRadius: 10, border: '1px solid #000' }} />
                </div>

            </div>

            <div className="UserPage-lots">
                <h1 align='center'>Избранные мастер-классы</h1>
                <div className="UserPage-lots_items">
                    {
                        lots && lots.map((lot, i)=> {
                            return (<LotCard key={i} img={lot.link} title={lot.title} type={lot.title} author={lot.author} difficulty={lot.difficulty} />)
                        })
                    }
                </div>
            </div>

            <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}>
                <button onClick={handleRoute} className="UserPage-add_btn">Добавить мастер-класс</button>
            </div>
            
        </div>
    );
}