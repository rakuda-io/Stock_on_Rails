import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';

const ChartsWrapper = styled.ul`
  display: flex;
  background-color: brown;
  list-style: none;
  padding: 0px;
`;

const Chart = styled.li`
  margin-right: -300px;
`

const List = styled.li`
  padding: 0px;
`


export const Dashboard = ({match}) => {
  const theme = useTheme();

  return(
    <>
      <HeaderParts padding="{theme}.spacing(4)"/>
      <ChartsWrapper>
        <Chart>
          <PieCharts match={match}/>
        </Chart>
        <List>
         <HoldingsList match={match}/>
        </List>
      </ChartsWrapper>
    </>
  )
}