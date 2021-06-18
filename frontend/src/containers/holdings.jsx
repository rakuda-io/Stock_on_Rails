import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';

//apis
import { fetchHoldings } from '../apis/holdings';

//images
import MainLogo from '../images/logo.jpg';
import MainCover from '../images/cover.jpg';

//css
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverWrapper = styled.div`
  text-align: center;
`;

const MainCoverImage = styled.img`
  height: 400px;
`;

export const Holdings = ({ match }) => {
  useEffect(() => {
    fetchHoldings(match.params.user_id)
    .then((data) =>
      console.log(data)
      )
  },[])
  return(
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverWrapper>
        <MainCoverImage src={MainCover} alt="main cover" />
      </MainCoverWrapper>
      保有株一覧
      <p>
        UserIDは {match.params.user_id} です
      </p>
    </Fragment>
  )
}