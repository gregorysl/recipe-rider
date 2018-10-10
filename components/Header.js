import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Item } = Menu;

const { Header } = Layout;
const MyHeader = () => (
  <Menu mode="horizontal">
    <Item key="home">
      <Link to="/">Home</Link>
    </Item>
    <Item key="products">
      <Link to="/products">Products</Link>
    </Item>
  </Menu>
);

export default MyHeader;
