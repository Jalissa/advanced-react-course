import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import {host, port} from 'config';
import StateApi from 'state-api';

const serverRender = async () => {
  const resp = await axios.get(`http://${host}:${port}/data`);
  const store = new StateApi(resp.data);

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store}/>
    ),
    initialData: resp.data
  }
};

export default serverRender;