import React, { Component } from 'react'

export class ValidationError extends Component {
  render() {
    if(this.props.message) {
      return (
        <div>
          <div className="error">{this.props.message}</div>
        </div>
      )
    }

    return (<></>)
  }
}

export default ValidationError
