import React from "react";
import { CustomTitle, CustomParagraph } from '../Styles';
import data from './data';
import AppPannel from '../../AppPannel';

export default function Home() {
  return (
    <div>
      <AppPannel/>

      <CustomTitle text={data.home_title} />
      <CustomParagraph text={data.home_text} />
    </div>
  );
}
