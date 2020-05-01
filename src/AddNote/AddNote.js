import React, { Component } from 'react'
import ApiContext from '../ApiContext' 

export class AddNote extends Component {
  static contextType = ApiContext

  handleSubmit(e){
    e.preventDefault()
    const { name, content, folderId } = e.target
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        content: content.value,
        folderId: folderId.value,
      })
    })
    .then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
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
          required
        />
        <label
          htmlFor='new-note-content'
        >
          Content
        </label>
        <input 
          id='new-note-content'
          name='content'
        />
        <label
          htmlFor='new-note-folder'
        >
          Select Folder
        </label>
        <select
          id='new-note-folder'
          name='folderId'
        >
          {this.displayFolderOptions()}
        </select>
        <button
          type='submit'
        >
          Sumbit
        </button>
      </form>
    )
  }
}

export default AddNote
