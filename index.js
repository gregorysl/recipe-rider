import 'antd/dist/antd.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import store from './store';
import Main from './components/Main';
import MyHeader from './components/Header';
import './styles/style.less';

const { Content } = Layout;

const rootDiv = document.getElementById('app');
const Item = (
  <BrowserRouter>
    <Provider store={store}>
      <Layout className="layout">
        <MyHeader />
        <Content>
          <div>
            <Main />
          </div>
        </Content>
      </Layout>
    </Provider>
  </BrowserRouter>
);
render(Item, rootDiv);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default;
    render(newApp);
  });
}
