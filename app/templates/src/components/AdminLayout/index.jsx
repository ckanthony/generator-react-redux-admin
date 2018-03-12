import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import Header from './Header'
import AppFooter from '../../components/AppFooter'
import logoWhale from '../../assets/logo-whale.png'
import logoText from '../../assets/logo-text.png'
import { openChangeMenu, toggleSider } from '../../actions/admin'
import './index.less'

const { Sider, Content } = Layout
// const { SubMenu } = Menu

class Admin extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
  }

  handleMenuItemOnClick(item) {
    this.props.history.push(`/admin/${item.key}`)
  }

  render() {
    const {
      match,
      children,
      openKeys,
      collapsed,
    } = this.props
    const selectedKey = match.path.split('/').splice(2)[0]
    return (
      <Layout className='admin-page'>
        <Sider
          className='admin-sider'
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={256}
        >
          <div className='logo'>
            <img src={logoWhale} alt='Admin Portal' />
            {!collapsed && <img className='text' src={logoText} alt='Admin Portal' />}
          </div>
          <Menu
            className='menu'
            theme='dark'
            mode='inline'
            openKeys={collapsed ? [] : openKeys}
            selectedKeys={[selectedKey]}
            onClick={this.handleMenuItemOnClick}
            onOpenChange={this.props.handleMenuOnOpenChange}
          >
            <Menu.Item key='campaigns'>
              <Icon type='notification' /><span>Campaigns</span>
            </Menu.Item>
            <Menu.Item key='campaign_applications'>
              <Icon type='solution' /><span>Applications</span>
            </Menu.Item>
            <Menu.Item key='users'>
              <Icon type='user' /><span>Users</span>
            </Menu.Item>
            <Menu.Item key='user_payments'>
              <Icon type='bank' /><span>Payments</span>
            </Menu.Item>
            <Menu.Item key='administrators'>
              <Icon type='key' /><span>Administrators</span>
            </Menu.Item>
            <Menu.Item key='regions'>
              <Icon type='global' /><span>Regions</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header collapsed={collapsed} handleHeaderOnToggle={this.props.handleHeaderOnToggle} />
          <Content>
            {children}
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  const { openKeys, collapsed } = state.admin || ['general']
  return { openKeys, collapsed }
}

const mapDispatchToProps = dispatch => ({
  handleMenuOnOpenChange: openKeys => dispatch(openChangeMenu(openKeys)),
  handleHeaderOnToggle: () => dispatch(toggleSider()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin))
