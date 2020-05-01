import React, { Component } from 'react'

export class AddFolder extends Component {
  handleSubmit(e){
    e.preventDefault()
    const { name } = e.target
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
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
        />
        <button
          type='submit'
        >
          Sumbit
        </button>
      </form>
    )
  }
}

export default AddFolder
