import React from 'react';
import Intro from '../../components/Intro/Intro';
import Categories from '../../components/Categories/Categories';
import Lot from '../../components/Lot/Lot';

export default function GeneralPage(props)
{
    return (
        <>
            <Intro background={props.intro_background} intro_text={props.intro_text} />
            <Categories />
            <Lot />
        </>
    );
}