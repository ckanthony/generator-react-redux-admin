import React, { Component } from 'react'

export default class ImagePreview extends Component {
  render() {
    const { src } = this.props
    return src && <img src={src} style={{ objectFit: 'cover' }} alt='preview' width='100px' height='100px' />
  }
}
