import React from "react";
import AppPannel from '../../AppPannel';
import { CustomTitle, CustomParagraph } from '../../Styles';
import styled from "styled-components";

const ImagePannel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 500px;
  background-image: url(https://www.clubcollaborator.com/file-manager/image/Security-graphic.png?context=mosimg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 80%;
  margin-bottom: auto;
  margin-left: auto;
  margin-top: auto;
  line-height: normal;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  font-size: 62px;
  margin-right: auto;
  margin-top: 30px;
  font-weight: 800;
  padding-top: 20px;
  padding-bottom: 20px;
  @media (max-width: 640px) {
    font-size: 52px;
    text-align: center;
  }
`;

export default function About() {
  return (
    <div>
      <AppPannel/>
      <CustomTitle text='Out platform is about securing your identity data in zero-trust world' />
      <ImagePannel/>
      <CustomParagraph text='Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctu
        s
        et ultrices posuere cubilia curae; Duis consequat nulla ac ex consequat,
        in efficitur arcu congue. Nam fermentum commodo egestas.' />
    </div>
  );
}
