import 'antd/dist/antd.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import store from './store';
import App from './components/App';
import MyHeader from './components/Header';
import './styles/style.less';
import ProductsPage from './components/ProductsPage';

const { Content } = Layout;

const rootDiv = document.getElementById('app');
const Item = (
  <BrowserRouter>
    <Provider store={store}>
      <Layout className="layout">
        <MyHeader />
        <Content>
          <div>
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/products" component={ProductsPage} />
            </Switch>
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
