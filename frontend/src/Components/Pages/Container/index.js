import React from 'react';
import AppPannel from '../../AppPannel';
import { CustomTitle } from '../../Styles';
import CustomCard from './card';
import './style.css';
import _ from 'lodash';

function renderCard(times) {
    let cards = [];
    _.times(times, () => {
        cards.push(
            <div className="column">
                <CustomCard/>
            </div>
        );
    });
    return cards;
}

export default function ContainerCard() {
  return (
    <div>
        <AppPannel/>
        <CustomTitle text='Your Containers' />

        <div className="row">
            {renderCard(13)}
        </div>
    </div>
  );
}