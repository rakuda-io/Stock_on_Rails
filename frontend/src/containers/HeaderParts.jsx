import React from 'react';
import styled from 'styled-components';

//images
import MainLogo from '../images/logo.png'

//css (styled component)
const MainLogoImage = styled.img`
  height: 20px;
  padding: 0 10px;
`;

const MainLogoText = styled.p`
  text-align: left;
  font-size: 1px;
  color: white;
`

const Header = styled.div`
  background: #336633;
  padding-left: 10px;
  width: 100%;
`

export const HeaderParts = () => {
  return(
    <>
      <Header>
        <MainLogoText>配当金管理アプリ</MainLogoText>
        <MainLogoImage src={MainLogo} alt='main logo' />
      </Header>
    </>
)}