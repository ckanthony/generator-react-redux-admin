import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from '../Login'
import NotFound from '../NotFound'
import Dashboard from '../Dashboard'
import RegionList from '../RegionList'
import RegionForm from '../RegionForm'
import CampaignList from '../CampaignList'
import CampaignForm from '../CampaignForm'
import CampaignApplicationList from '../CampaignApplicationList'
import CampaignApplicationForm from '../CampaignApplicationForm'
import CampaignStepList from '../CampaignStepList'
import CampaignStepForm from '../CampaignStepForm'
import UserList from '../UserList'
import UserForm from '../UserForm'
import UserPaymentList from '../UserPaymentList'
import UserPaymentForm from '../UserPaymentForm'
import AdministratorList from '../AdministratorList'
import AdministratorForm from '../AdministratorForm'
import PrivateRoute from '../../components/PrivateRoute'
import './index.less'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={() => <Redirect to='/login' />} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/admin' component={() => <Redirect to='/admin/campaigns' />} />
          <PrivateRoute exact path='/admin/dashboard' component={Dashboard} />

          <PrivateRoute exact path='/admin/regions' component={RegionList} />
          <PrivateRoute exact path='/admin/regions/create' component={props => <RegionForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/regions/edit/:itemId' component={props => <RegionForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/campaigns' component={CampaignList} />
          <PrivateRoute exact path='/admin/campaigns/create' component={props => <CampaignForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/campaigns/edit/:itemId' component={props => <CampaignForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/campaigns/edit/:campaignId/steps' component={CampaignStepList} />
          <PrivateRoute exact path='/admin/campaigns/edit/:campaignId/steps/create' component={props => <CampaignStepForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/campaigns/edit/:campaignId/steps/edit/:itemId' component={props => <CampaignStepForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/campaign_applications' component={CampaignApplicationList} />
          <PrivateRoute exact path='/admin/campaign_applications/create' component={props => <CampaignApplicationForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/campaign_applications/edit/:itemId' component={props => <CampaignApplicationForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/users' component={UserList} />
          <PrivateRoute exact path='/admin/users/create' component={props => <UserForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/users/edit/:itemId' component={props => <UserForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/user_payments' component={UserPaymentList} />
          <PrivateRoute exact path='/admin/user_payments/create' component={props => <UserPaymentForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/user_payments/edit/:itemId' component={props => <UserPaymentForm {...props} type='edit' />} />

          <PrivateRoute exact path='/admin/administrators' component={AdministratorList} />
          <PrivateRoute exact path='/admin/administrators/create' component={props => <AdministratorForm {...props} type='create' />} />
          <PrivateRoute exact path='/admin/administrators/edit/:itemId' component={props => <AdministratorForm {...props} type='edit' />} />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
