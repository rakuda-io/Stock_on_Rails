import React, { Fragment, useEffect } from 'react';

//apis
import { fetchHoldings } from '../apis/holdings';

export const Holdings = ({ match }) => {
  useEffect(() => {
    fetchHoldings(match.params.user_id)
    .then((data) =>
      console.log(data)
      )
  },[])
  return(
    <Fragment>
      保有株一覧
      <p>
        UserIDは {match.params.user_id} です
      </p>
    </Fragment>
  )
}