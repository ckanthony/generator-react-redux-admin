import React from 'react'
import { Table, Modal, Avatar } from 'antd'
import { TableRowEditButton } from '../../components/AppButton'
import FormattedDate from '../../components/FormattedDate'
import ImagePreview from '../../components/ImagePreview'

class ItemListTable extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
      }, {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: true,
        render: text => <FormattedDate text={text} />,
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <TableRowEditButton to={`${this.props.editPath}/${record.id}`} />
          </span>
        ),
      },
    ]
    return (
      <Table
        rowKey={record => `item-row-${record.id}`}
        columns={columns}
        {...this.props}
      />
    )
  }
}

export default ItemListTable
