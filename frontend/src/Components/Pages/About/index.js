import React from "react";
import AppPannel from '../../AppPannel';
import { CustomTitle, CustomParagraph } from '../../Styles';

export default function About() {
  return (
    <div>
      <AppPannel/>
      <CustomTitle text='This is the About Page' />
      <CustomParagraph text='Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctu
        s
        et ultrices posuere cubilia curae; Duis consequat nulla ac ex consequat,
        in efficitur arcu congue. Nam fermentum commodo egestas.' />
    </div>
  );
}
