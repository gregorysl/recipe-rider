import 'antd/dist/antd.less';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import store from './store';
import Main from './components/Main';
import App from './components/App';
import ProductsPage from './components/ProductsPage';
import './styles/style.less';

const { Item } = Menu;
const { Content } = Layout;

const rootDiv = document.getElementById('app');
const Page = (
  <BrowserRouter>
    <Provider store={store}>
      <Layout className="layout">
        <Menu mode="horizontal">
          <Item key="home">
            <Link to="/">Przepisy</Link>
          </Item>
          <Item key="products">
            <Link to="/products">Products</Link>
          </Item>
        </Menu>
        <Content>
          <Main />
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/products" component={ProductsPage} />
          </Switch>
        </Content>
      </Layout>
    </Provider>
  </BrowserRouter>
);
render(Page, rootDiv);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default;
    render(newApp);
  });
}
