import { useParams } from "react-router-dom";
import AppPannel from '../../AppPannel';
import React from "react";
import { CustomTitle, CustomParagraph } from '../../Styles';
import { StyledProfile } from './styled';

const Profile = () => {
  const { name } = useParams();
  return (
    <div>
      <AppPannel/>
      <StyledProfile/>
    </div>
  );
};

export default Profile;
