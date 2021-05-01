import { useParams } from "react-router-dom";
import AppPannel from '../../AppPannel';
import React from "react";
import { CustomTitle, CustomParagraph } from '../Styles';

const Profile = () => {
  const { name } = useParams();
  return (
    <div>
      <AppPannel/>

      <CustomTitle text='This is the Profile Page' />
      <article className="message is-dark" style={{ marginTop: 40 }}>
        <div className="message-header">
          <p>{name}</p>
        </div>
        <CustomParagraph text='Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
          nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
          purus diam, et dictum <a href="http://" >felis venenatis</a> efficitur. Aenean ac{" "}
          <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
          sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi
          magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales
          sem.' />
      </article>
    </div>
  );
};

export default Profile;
