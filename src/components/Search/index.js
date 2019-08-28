import React from 'react'

// ES6 arrow functions let you remove the block body, {}
const Search = ({ value, onChange, onSubmit, children }) => 
  <form onSubmit={onSubmit}>
    <input 
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">{children}</button>
  </form>

  export default Search