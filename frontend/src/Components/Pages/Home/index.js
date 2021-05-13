import React from "react";
import { CustomTitle, CustomParagraph } from '../../Styles';
import data from './data';
import AppPannel from '../../AppPannel';
import styled from "styled-components";

const ImagePannel = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 500px;
  background-image: url(https://www.fansmetric.com/images/feature2_custom2.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 80%;
  margin-bottom: auto;
  margin-left: auto;
  margin-top: auto 30px;
  line-height: normal;
  text-align: left;
  color: rgba(255, 255, 255, 1);
  font-size: 62px;
  margin-right: auto;
  font-weight: 800;
  padding-top: 20px;
  padding-bottom: 20px;
  @media (max-width: 640px) {
    font-size: 52px;
    text-align: center;
  }
`;

export default function Home() {
  return (
    <div>
      <AppPannel/>
      <CustomTitle text={data.home_title} />
      <ImagePannel/>
      <CustomParagraph text={data.home_text} />
      <div style={{marginBottom: '80px'}}></div>
    </div>
  );
}
