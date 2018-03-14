import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../../components/PrivateRoute'
import Login from '../Login'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import './index.less'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/login' />} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/admin' component={() => <Redirect to='/admin/dashboard' />} />
          <PrivateRoute exact path='/admin/dashboard' component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
