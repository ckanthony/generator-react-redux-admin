import React, { Component } from 'react'
import { Upload, Button, Icon, message } from 'antd'
import api from '../../utils/api'
import './index.less'

export default class ImageUpload extends Component {
  constructor(props) {
    super(props)
    this.upload = this.upload.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      fileList: [],
    }
    this.uploadImage = async (data) => {
      const { file } = data
      const response = await api.upload(file)
      if (response.success) {
        const imageUrl = response.file
        const currentFileList = (this.props.multiple && this.state.fileList) || []
        const updatedFileList = [...currentFileList, {
          uid: currentFileList.length,
          name: imageUrl.split('/').slice(-1)[0],
          status: 'done',
          url: imageUrl,
          thumbUrl: imageUrl,
        }]
        this.uploadImage && this.setState({
          fileList: updatedFileList,
        })
        const imageUrls = updatedFileList.map(item => item.url).join(',')
        this.uploadImage && this.props.onChange && this.props.onChange(imageUrls)
        data.onSuccess()
      } else {
        this.uploadImage && this.props.onFailure && this.props.onFailure()
        data.onError()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    const imageUrls = (value && value.split(',')) || null
    const fileList = (imageUrls && imageUrls.map((url, index) => ({
      uid: index,
      name: url.split('/').slice(-1)[0],
      status: 'done',
      url,
      thumbUrl: url,
    })))
    this.setState({
      fileList,
    })
  }

  componentWillUnmount() {
    this.setState({
      fileList: [],
    })
    this.uploadImage = null
  }

  onChange(info) {
    const { status } = info.file
    if (status === 'done') {
      message.success('The image is uploaded.')
    } else if (status === 'error') {
      message.error('Please upload the image again.')
    }
  }

  onRemove(file) {
    const fileList = this.state.fileList.filter(item => item.uid !== file.uid)
    this.setState({
      fileList,
    })
    const imageUrls = (fileList.length > 0 && fileList.map(item => item.url).join(',')) || null
    this.props.onChange && this.props.onChange(imageUrls)
  }

  upload(data) {
    this.uploadImage(data)
  }

  render() {
    const props = {
      listType: 'picture',
      onChange: this.onChange,
      onRemove: this.onRemove,
      customRequest: this.upload,
      fileList: this.state.fileList || [],
    }
    return (
      <Upload className='app-image-upload' {...props}>
        <Button>
          <Icon type='upload' />Click to upload
        </Button>
      </Upload>
    )
  }
}
