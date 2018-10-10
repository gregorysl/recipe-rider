import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const { Item } = Menu;

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
