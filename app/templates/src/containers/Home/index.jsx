import React from 'react'
import { Card, Layout } from 'antd'
import AppHeader from '../../components/AppHeader'
import AppFooter from '../../components/AppFooter'
import './index.less'

const { Content } = Layout

export default class Home extends React.Component {
  render() {
    return (
      <Layout className='home-page'>
        <AppHeader />
        <Content>
          <Card>
            <h1>Welcome to React Starter.</h1>
            <p>This is a demo project by <a href='https://github.com/bichenkk'>@bichenkk.</a></p>
          </Card>
        </Content>
        <AppFooter />
      </Layout>
    )
  }
}
