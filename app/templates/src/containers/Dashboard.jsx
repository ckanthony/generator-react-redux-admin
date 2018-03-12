import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'
import AdminLayout from '../components/AdminLayout'
import SectionContent from '../components/SectionContent'

class Dashboard extends React.Component {
  render() {
    return (
      <AdminLayout>
        <SectionContent>
          <p>Dashboard</p>
        </SectionContent>
      </AdminLayout>
    )
  }
}

export default connect()(Dashboard)
