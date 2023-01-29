import * as React from 'react';
import {useRouteError} from 'react-router-dom';


interface ErrorResponse {
  data: any;
  status: number;
  statusText: string;
  message?: string;
}

export const Error = () => {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <div className="mm-error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
