import React from 'react';
import ReactDOM from 'react-dom';
import AppOriginal from './AppOriginal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppOriginal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
