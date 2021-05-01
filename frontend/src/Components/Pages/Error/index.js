import React from "react";
import AppPannel from '../../AppPannel';
import { CustomTitle, CustomParagraph } from '../Styles';

export default function Error() {
  return (
    <div>
      <AppPannel/>
      <CustomTitle text='Restricted access or page does not exist' />
      <CustomParagraph text='You do not have proper permissions. Check you role or contact your instance administrator.' />
    </div>
  );
}
