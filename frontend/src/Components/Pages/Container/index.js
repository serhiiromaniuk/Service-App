import React from 'react';
import AppPannel from '../../AppPannel';
import { CustomTitle } from '../../Styles';
import CustomCard from './card';
import AddContainer from './addContainer';
import { api, opt, getUserData, decryptText } from '../../Utils'
import './style.css';
import _ from 'lodash';
import axios from 'axios';

export default function ContainerCard() {
    const [ data, setData ] = React.useState([]);
    
    function getContainers() {
        const url = api.get.block.container.owner;
        const auth_token = getUserData();
    
        axios.get(url + auth_token.token, opt).then(
            function(res) {
                setData(res.data);
            }
        ).catch(
            function(error) {
                console.log(error);
            }
        );
    }
    React.useEffect(() => { getContainers() },[]);

    function renderCard() {
        let cards = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const body = decryptText(element.body).toString();
            cards.push(
                <div className="column">
                    <CustomCard
                        containerName={element.name}
                        containerBody={body}
                        containerCreatedAt={element.created_at}
                    />
                </div>
            );
        }
        return cards;
    }
    
    return (
        <div>
            <AppPannel/>
            <CustomTitle text='Your Containers' />
            <AddContainer/>

            <div className="row">
                {renderCard()}
            </div>
        </div>
    );
}