import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';
import { Total_dividend } from './TotalDividend.jsx';
import { MyContext } from '../MyContext.js';

const ChartsWrapper = styled.ul`
  display: grid;
  /* background-color: brown; */
  list-style: none;
  padding: 0px;
`;

const Chart = styled.li`
  margin-right: -350px;
`

const List = styled.li`
  padding: 0px;
`


export const Dashboard = ({match}) => {

  return(
    <>
      <HeaderParts padding="{theme}.spacing(4)"/>
      <ChartsWrapper>
        <Chart>
          <PieCharts match={match}/>
        </Chart>
        <Total_dividend match={match}/>
      </ChartsWrapper>
        <List>
         <HoldingsList match={match}/>
        </List>
    </>
  )
}