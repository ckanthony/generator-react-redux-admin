import React from 'react'
import { Card, message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { changeFormFields, sendLoginRequest } from '../../actions/login'
import Form from './Form'
import AppFooter from '../../components/AppFooter'
import logoImage from '../../assets/logo-full.png'
import backgroundImage from '../../assets/background.jpg'
import './index.less'

class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isLoginLoading && nextProps.isLoginSuccess) {
      message.success('You have successfully logged in.')
    } else if (this.props.isLoginLoading && nextProps.loginError) {
      message.error(nextProps.loginError)
    }
  }

  render() {
    const { isLoggedIn } = this.props
    if (isLoggedIn) {
      return <Redirect to={{ pathname: '/admin' }} />
    }
    return (
      <div
        className='login-page'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <Card className='login-form'>
          <div className='header'>
            <img src={logoImage} height='200px' alt='React Starter' />
            <p>Administration Portal</p>
          </div>
          <Form
            onSubmit={this.props.handleFormOnSubmit}
            onFieldsChange={this.props.handleFormOnFieldsChange}
            formFieldValues={this.props.formFieldValues}
            isLoading={this.props.isLoginLoading}
          />
        </Card>
        <AppFooter />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    formFieldValues,
    isLoginLoading,
    isLoginSuccess,
    loginError,
  } = state.login
  const isLoggedIn = !!state.app.accessToken
  return {
    formFieldValues,
    isLoginLoading,
    isLoggedIn,
    isLoginSuccess,
    loginError,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFormOnSubmit: formValues => dispatch(sendLoginRequest(formValues)),
  handleFormOnFieldsChange: formFieldsChange => dispatch(changeFormFields(formFieldsChange)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
