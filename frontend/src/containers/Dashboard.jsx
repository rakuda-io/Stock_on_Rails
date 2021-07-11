import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';
import { Total_dividend } from './TotalDividend.jsx';
import { Level } from './Level.jsx';
import { MyContext } from '../MyContext.js';

const Background = styled.div`
  background-color: grey;
`
const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: 300px 300px;
  grid-template-columns: 400px 300px 1fr;
`;

const Chart = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  background-color: lightgrey;
  padding: 3px;
  margin: 10px;
  /* margin-right: -350px; */
  /* grid-template-rows: 30%; */
`;

const TotalWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  margin: 10px 0 10px 0;
  padding: 30px 0 0 50px;
  background-color: lightgrey;
`;

const LevelWrapper = styled.div`
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  margin: 10px;
  padding: 10px 0 0 50px;
  background-color: lightgrey;
`;

const List = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 4;
  background-color: lightgrey;
  margin: 0 10px 10px 10px;
  padding: 0 0 100px 0;
`;


export const Dashboard = ({match}) => {

  return(
    <>
      <Background>
      <HeaderParts padding="{theme}.spacing(4)"/>
      <GridWrapper>
        <Chart>
          <PieCharts match={match}/>
        </Chart>
        <TotalWrapper>
        <Total_dividend match={match}/>
        </TotalWrapper>
        <LevelWrapper>
        <Level match={match}/>
        </LevelWrapper>
        <List>
          <HoldingsList match={match}/>
        </List>
      </GridWrapper>
      </Background>
    </>
  )
}