import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({
      error,
    })
  }

  render() {
   if(this.state.error) {
    return (
      <div>
        <p>{this.state.error.toSrtring()}</p>
      </div>
    )
   }

   return this.props.children

  }
}

export default ErrorBoundary
