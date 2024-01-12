import React, { useEffect, useState } from 'react';
import Select from 'react-select'

import './AddLotPage.css';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddLotPage(props)
{
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFile2, setSelectedFile2] = useState();
    const [selectedFile3, setSelectedFile3] = useState();
    const [selectedFile4, setSelectedFile4] = useState();
    const [preview, setPreview] = useState();
    const [preview2, setPreview2] = useState();
    const [preview3, setPreview3] = useState();
    const [preview4, setPreview4] = useState();

    const [select1, setSelect1] = useState();
    const [select2, setSelect2] = useState();

    const [uo, setUo] = useState();
    const [material, setMaterial] = useState();
    const [description, setDescription] = useState();

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

    useEffect(() => {
        const objectUrl4 = selectedFile4 ? URL.createObjectURL(selectedFile4) : undefined;
        if (selectedFile4)
            setPreview4(objectUrl4);
        else                
            setPreview4(undefined);

        return () => objectUrl4 && URL.revokeObjectURL(objectUrl4);
    }, [selectedFile4])

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

    const onChange4 = (e) =>
    {
        if (!e.target.files || e.target.files.length === 0)
            setSelectedFile4(undefined);
        else
            setSelectedFile4(e.target.files[0]);

        console.log(e.target.files[0]);
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

    const user = localStorage.getItem('user');
    if (!user)
        return <Navigate to={"/login"} replace={true} />

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSave = async () => 
    {
        const image1_b64 = await convertBase64(selectedFile);
        const image2_b64 = await convertBase64(selectedFile);
        const image3_b64 = await convertBase64(selectedFile);
        const image4_b64 = await convertBase64(selectedFile);

        let data = {
            image1: image1_b64,
            img1_name: selectedFile.name,
            image2: image2_b64,
            img2_name: selectedFile2.name,
            image3: image3_b64,
            img3_name: selectedFile3.name,
            image4: image4_b64,
            img4_name: selectedFile4.name,
            type: select1 && select1.label || 'крючком',
            difficulty: select2 && select2.label || 'низкая',
            uo: uo,
            material: material,
            description: description
        };


        (async () => {
            const rawRes = await fetch('http://space12490.temp.swtest.ru/api/index.php?action=createLotEntry', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const content = await rawRes.json();
            if (content.ok)
                return navigate('/');
        })();
    }

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
                    <Select onChange={(c) => setSelect1(c)} placeholder="Выберите чем вязать" className='AddLotPage-description_select' id="type_o" options={type_options} />

                    <label htmlFor="diff_o">Сложность</label>
                    <Select onChange={(c) => setSelect2(c)} placeholder="Выберите сложность" className='AddLotPage-description_select' id="diff_o" options={diff_options} />
                </div>

                <div className='AddLotPage-description_text'>
                    <label htmlFor="AddLotPage-description_text">Условные обозначения</label>
                    <textarea onChange={(e) => setUo(e.target.value)} className='AddLotPage-description_textarea' id="AddLotPage-description_text" placeholder='Опишите используемые в вашем мастер-классе обозначения петель' />
                </div>
            </div>


            <label htmlFor="mat_o">Материалы</label>
            <div className='AddLotPage-description'>
                <div className='AddLotPage-description_selects'>
                    <textarea onChange={(e) => setMaterial(e.target.value)} id="mat_o" className='AddLotPage-materials_textarea' placeholder='Введите материал' />
                </div>

                <div className='AddLotPage-description_text'>
                    <textarea onChange={(e) => setDescription(e.target.value)} className='AddLotPage-description_textarea' placeholder='Здесь подробнее опишите используемые в вашем мастер-классе материалы' />
                </div>
            </div>

            <h2 align='center'>Описание</h2>
            <div className='AddLotPage-description_block'>
                <textarea className='AddLotPage-description_textarea' id="AddLotPage-description_text" placeholder='Опишите используемые в вашем мастер-классе обозначения петель' />

                <div className="AddLotPage-description-image" style={{ background: preview4 ? 'url('+preview4+')' : '#D1D1D1' }}  onClick={() => { let input4 = document.querySelector('#lot-image-4'); input4.click(); }}>
                    {preview4 ? '' : <span>Добавить фото изделия</span>}
                    <input id="lot-image-4" onChange={onChange4} type="file" accept="image/*" style={{ display: 'none' }}/>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
                <button onClick={handleSave} className="AddLotPage-description_btn">Сохранить мастер-класс</button>
            </div>
        </div>
    );
}