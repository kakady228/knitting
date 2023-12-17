import React, { useEffect, useState } from 'react';
import Select from 'react-select'

import './AddLotPage.css';
import { Navigate } from 'react-router-dom';

export default function AddLotPage(props)
{
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [selectedFile3, setSelectedFile3] = useState();
    const [preview, setPreview] = useState();
    const [preview2, setPreview2] = useState();
    const [preview3, setPreview3] = useState();

    useEffect(() => {

        const objectUrl = selectedFile ? URL.createObjectURL(selectedFile) : undefined;
        
        if (selectedFile)
            setPreview(objectUrl);
        else                
            setPreview(undefined);
        
        return () => objectUrl && URL.revokeObjectURL(objectUrl);

    }, [selectedFile]);
    
    useEffect(() => {
        const objectUrl2 = selectedFile2 ? URL.createObjectURL(selectedFile2) : undefined;
        
        if (selectedFile2)
            setPreview2(objectUrl2);
        else                
            setPreview2(undefined);
        
        return () => objectUrl2 && URL.revokeObjectURL(objectUrl2);
    }, [selectedFile2]);

    useEffect(() => {
        const objectUrl3 = selectedFile3 ? URL.createObjectURL(selectedFile3) : undefined;
        if (selectedFile3)
            setPreview3(objectUrl3);
        else                
            setPreview3(undefined);

        return () => objectUrl3 && URL.revokeObjectURL(objectUrl3);
    }, [selectedFile3])

    const onChange = (e) =>
    {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile(undefined);
        else
            setSelectedFile(e.target.files[0]);
    }

    const onChange2 = (e) =>
    {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile2(undefined);
        else
            setSelectedFile2(e.target.files[0]);
    }

    const onChange3 = (e) =>
    {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile3(undefined);
        else
            setSelectedFile3(e.target.files[0]);
    }
    
    const diff_options = [
        { value: 'низкая', label: 'низкая' },
        { value: 'средняя', label: 'средняя' },
        { value: 'высокая', label: 'высокая' }
    ];

    const type_options = [
        { value: 'крючком', label: 'крючком' },
        { value: 'на спицах', label: 'на спицах' },
        { value: 'на вилке', label: 'на вилке' }
    ];

    const mat_options = [
        { value: 'test', label: 'test' }
    ];

    const user = localStorage.getItem('user');
    if (!user)
        return <Navigate to={"/login"} replace={true} />

    return (
        <div className='AddLotPage'>
            <h1 align='center'>Название изделия</h1>

            <div className='AddLotPage-images'>
                <div className="AddLotPage-image" style={{ background: preview ? 'url('+preview+')' : '#D1D1D1' }}  onClick={() => { let input = document.querySelector('#lot-image-1'); input.click(); }}>
                    {preview ? '' : <span>Добавить фото изделия</span>}
                    <input id="lot-image-1" onChange={onChange} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>
                <div className="AddLotPage-image" style={{ background: preview2 ? 'url('+preview2+')' : '#D1D1D1' }}  onClick={() => { let input2 = document.querySelector('#lot-image-2'); input2.click(); }}>
                    {preview2 ? '' : <span>Добавить фото изделия</span>}
                    <input id="lot-image-2" onChange={onChange2} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>
                <div className="AddLotPage-image" style={{ background: preview3 ? 'url('+preview3+')' : '#D1D1D1' }}  onClick={() => { let input3 = document.querySelector('#lot-image-3'); input3.click(); }}>
                    {preview3 ? '' : <span>Добавить фото изделия</span>}
                    <input id="lot-image-3" onChange={onChange3} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>
            </div>

            <div className='AddLotPage-description'>
                <div className='AddLotPage-description_selects'>
                    <label htmlFor="type_o">Вязать</label>
                    <Select placeholder="Выберите чем вязать" className='AddLotPage-description_select' id="type_o" options={type_options} />

                    <label htmlFor="diff_o">Сложность</label>
                    <Select placeholder="Выберите сложность" className='AddLotPage-description_select' id="diff_o" options={diff_options} />
                </div>

                <div className='AddLotPage-description_text'>
                    <label htmlFor="AddLotPage-description_text">Условные обозначения</label>
                    <textarea className='AddLotPage-description_textarea' id="AddLotPage-description_text" placeholder='Опишите используемые в вашем мастер-классе обозначения петель' />
                </div>
            </div>


            <div className='AddLotPage-description'>
                <div className='AddLotPage-description_selects'>
                    <label htmlFor="mat_o">Материалы</label>
                    <Select placeholder="Выберите материал" className='AddLotPage-description_select' id="mat_o" options={mat_options} />
                    <button className="AddLotPage-description_btn">Добавить материал</button>
                </div>

                <div className='AddLotPage-description_text'>
                    <textarea className='AddLotPage-description_textarea' placeholder='Здесь подробнее опишите используемые в вашем мастер-классе материалы' />
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <button className="AddLotPage-description_btn">Сохранить мастер-класс</button>
            </div>
        </div>
    );
}