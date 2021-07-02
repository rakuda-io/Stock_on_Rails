import React from 'react';

//components
import { HeaderParts } from './HeaderParts.jsx';
import { PieCharts } from './PieChart.jsx';
import { HoldingsList } from './HoldingsList.jsx';

export const Dashboard = ({match}) => {
  return(
    <>
      <HeaderParts />
      <PieCharts match={match}/>
      <HoldingsList match={match}/>
    </>
  )
}