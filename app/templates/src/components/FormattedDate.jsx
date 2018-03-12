import React from 'react'

class FormattedDate extends React.Component {
  render() {
    const { text } = this.props
    return (
      <div>
        {text && (new Date(text)).toLocaleString()}
      </div>
    )
  }
}

export default FormattedDate
