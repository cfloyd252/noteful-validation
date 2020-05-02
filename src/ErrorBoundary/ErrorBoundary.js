import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  state = {
    error: ''
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
        <p>{this.state.error.toString()}</p>
      </div>
    )
   }

   return this.props.children

  }
}

export default ErrorBoundary
