import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

//apis
import { fetchHoldings } from '../apis/holdings';

//reducers
import {
  initialState,
  holdingsActionTypes,
  holdingsReducer,
} from '../reducers/holdings';

//constants
import { REQUEST_STATE } from '../constants';

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

export const Holdings = ({
  match
 }) => {
  const [holdingsState, dispatch] = useReducer(holdingsReducer, initialState);
  useEffect(() => {
    dispatch({ type: holdingsActionTypes.FETCHING});
    fetchHoldings(match.params.user_id)
    .then((data) => {
      dispatch({
        type: holdingsActionTypes.FETCH_SUCCESS,
        payload: {
          holdings: data[0].holdings
        }
      });
    })
  },[match.params.user_id])

  return(
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverWrapper>
        <MainCoverImage src={MainCover} alt="main cover" />
      </MainCoverWrapper>
      {
        holdingsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中...
            </p>
          </Fragment>
        :
          // console.log(holdingsState.holdingsList)
          holdingsState.holdingsList.map(holding =>
            <div key={holding.id}>
              {holding.ticker}
            </div>
          )
      }
      保有株一覧
      <p>
        UserIDは {match.params.user_id} です
      </p>
    </Fragment>
  )
}