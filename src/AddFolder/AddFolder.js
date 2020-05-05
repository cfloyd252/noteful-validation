import React, { Component } from 'react'
import ValidationError from '../ValidationError/ValidationError'
import ApiContext from '../ApiContext'

export class AddFolder extends Component {
  static contextType = ApiContext

  state = {
    folderName: {
      value: '',
      touched: false
    }
  }

  updateFolderName(value) {
    this.setState({
      folderName: {
        value,
        touched: true
      }
    })
  }

  validateFolderName() {
    const folderName = this.state.folderName.value.trim()
    if (this.state.folderName.touched && folderName.length === 0) {
      return 'Name for new folder required'
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const { folderName } = this.state
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: folderName.value,
      })
    })
    .then((res) => {
      if(!res.ok) {
        return res.json().then((e) => Promise.reject(e))
      } 
      return res.json()
    })
    .then(folder => {
      this.context.addFolder(folder)
      this.props.history.push(`/`)
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <form 
        onSubmit={e => this.handleSubmit(e)}
      >
        <label
          htmlFor='new-folder-name'
        >
          Name:
        </label>
        <input 
          id='new-folder-name'
          name='name'
          required
          onChange={e => this.updateFolderName(e.target.value)}
        />
        {this.state.folderName.touched && (
          <ValidationError message={this.validateFolderName()} />
        )}
        <button
          type='Submit'
          disabled={
            this.validateFolderName()
          }
        >
          Submit
        </button>
      </form>
    )
  }
}

export default AddFolder
