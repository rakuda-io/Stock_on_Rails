import React, { Fragment, useEffect } from 'react';

//apis
import { fetchHoldings } from '../apis/holdings';

export const Holdings = ({ match }) => {
  useEffect(() => {
    fetchHoldings()
    .then((data) =>
      console.log(data)
      )
  },[])
  return(
    <Fragment>
      保有株一覧
      <p>
        UserIDは {match.params.userId} です
      </p>
    </Fragment>
  )
}