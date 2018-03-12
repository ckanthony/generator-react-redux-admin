import React from 'react'
import { Layout, Menu, Modal, Icon } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../actions/app'

const { Header } = Layout

class CustomisedHeader extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleMenuItemOnClick = this.handleMenuItemOnClick.bind(this)
  }

  handleMenuItemOnClick(item) {
    switch (item.key) {
      case 'logout': {
        const handleAppLogOut = () => { this.props.handleAppLogOut() }
        Modal.confirm({
          title: 'Logout',
          content: 'Are you sure you want to log out?',
          onOk() {
            handleAppLogOut()
          },
          onCancel() {
            // console.log('Cancel')
          },
        })
        break
      }
      default:
    }
  }

  render() {
    return (
      <Header className='admin-header' style={{ background: '#fff', padding: 0 }}>
        <Icon
          className='trigger'
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.handleHeaderOnToggle}
        />
        <Menu
          mode='horizontal'
          selectable={false}
          style={{ lineHeight: '64px' }}
          onClick={this.handleMenuItemOnClick}
        >
          <Menu.Item key='logout'>Logout</Menu.Item>
        </Menu>
      </Header>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  handleAppLogOut: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomisedHeader)
