import React, { Fragment } from 'react';

export const Holdings = ({ match }) => {
  return(
    <Fragment>
      保有株一覧
      <p>
        UserIDは {match.params.user_id} です
      </p>
    </Fragment>
  )
}