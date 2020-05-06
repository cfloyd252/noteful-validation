import React, { Component } from 'react'
import ApiContext from '../ApiContext' 
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'

export class AddNote extends Component {
  static contextType = ApiContext

  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folderId: {
      value: '',
      touched: false
    },
  }

  updateName(value) {
    this.setState({
      name: {
        value,
        touched: true
      }
    })
  }

  updateContent(value) {
    this.setState({
      content: {
        value,
        touched: true
      }
    })
  }

  updateFolderId(value) {
    this.setState({
      folderId: {
        value,
        touched: true
      }
    })
  }

  validateName(){
    const name = this.state.name.value
    if(name.length === 0){
      return 'There must be a name for the new note'
    }
  }

  validateFolderId(){
    const name = this.state.folderId.value
    if(name.length === 0){
      return 'Please select a folder for the new note'
    }
  }

  handleSubmit(e){
    e.preventDefault()
    const { name, content, folderId } = this.state
    this.props.history.push(`/folder/${folderId.value}`)
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        content: content.value,
        folderId: folderId.value,
        modified: Date(Date.now())
      })
    })
    .then((res) => {
      if(!res.ok) {
        return res.json().then((e) => Promise.reject(e))
      } 
      return res.json()
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${folderId.value}`)
    })
    .catch(err => console.error(err))
  }

  displayFolderOptions () {
    return this.context.folders.map(folder => {
      return (<option value={folder.id}>{folder.name}</option>)
    })
  }

  render() {
    return (
      <form 
        onSubmit={e => this.handleSubmit(e)}
      >
        <label
          htmlFor='new-note-name'
        >
          Name
        </label>
        <input 
          id='new-note-name'
          name='name'
          onChange={e => this.updateName(e.target.value)}
          required
        />
        {this.state.name.touched && (
          <ValidationError message={this.validateName()} />
        )}
        <label
          htmlFor='new-note-content'
        >
          Content
        </label>
        <input 
          id='new-note-content'
          name='content'
          onChange={e => this.updateContent(e.target.value)}
        />
        <label
          htmlFor='new-note-folder'
        >
          Select Folder
        </label>
        <select
          id='new-note-folder'
          name='folderId'
          onChange={e => this.updateFolderId(e.target.value)}
          required
        >
          <option value=''>Select Folder</option>
          {this.displayFolderOptions()}
        </select>
        {this.state.folderId.touched && (
          <ValidationError message={this.validateFolderId()} />
        )}
        <button
          type='submit'
        >
          Submit
        </button>
      </form>
    )
  }
}

export default AddNote
