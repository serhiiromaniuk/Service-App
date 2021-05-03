import React from 'react';
import AppPannel from '../../AppPannel';
import { CustomTitle, CustomParagraph } from '../Styles';

export default class Organisation extends React.Component {
    render() {
      return (
        <div>
          <AppPannel/>
          <CustomTitle text='Org Page' />
        </div>
      );
    }
}

