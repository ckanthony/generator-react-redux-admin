import React from 'react'
import { Menu, Icon } from 'antd'

export default props => (
  <Menu {...props}>
    <Menu.Item key='dashboard'><Icon type='pie-chart' /><span>Dashboard</span></Menu.Item>
  </Menu>
)
