import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import store from "./store";
import Main from "./components/Main";
import App from "./App";
import ProductsPage from "./components/ProductsPage";
import "./index.css";
import "./styles/style.sass";
import "antd/lib/layout/style/css";
import "antd/lib/menu/style/css";

const { Item } = Menu;
const { Content } = Layout;

const rootDiv = document.getElementById("root");
const Page = (
  <BrowserRouter>
    <Provider store={store}>
      <Layout className="layout">
        <Menu mode="horizontal">
          <Item key="home">
            <Link to="/">Przepisy</Link>
          </Item>
          <Item key="products">
            <Link to="/products">Produkty</Link>
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
ReactDOM.render(Page, rootDiv);
