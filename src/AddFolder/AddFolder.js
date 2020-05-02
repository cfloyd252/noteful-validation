import React, { Component } from 'react'
import ValidationError from '../ValidationError/ValidationError'

export class AddFolder extends Component {
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
    .then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
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
          onChange={e => this.updateFolderName(e.target.value)}
        />
        {this.state.folderName.touched && (
          <ValidationError message={this.validateFolderName()} />
        )}
        <button
          type='submit'
          disabled={
            this.validateFolderName()
          }
        >
          Sumbit
        </button>
      </form>
    )
  }
}

export default AddFolder
