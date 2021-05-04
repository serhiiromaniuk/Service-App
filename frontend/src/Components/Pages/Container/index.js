import React from 'react';
import AppPannel from '../../AppPannel';
import { CustomTitle } from '../../Styles';
import CustomCard from './card';
import './style.css';
import _ from 'lodash';

function renderCard(times) {
    let card = [];
    _.times(times, () => {
        card.push(
            <div className="column">
                <CustomCard/>
            </div>
        );
    });
    return card;
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