import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

// const list = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
// ];

const isSearched = searchTerm => item => {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase())
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
  }

  componentDidMount() {
    const { searchTerm } = this.state

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  setSearchTopStories = result => {
    this.setState({ result })
  }

  onDismiss = id => {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id)
    // const updatedResult = Object.assign({}, this.state.result, { hits: updatedHits })
    const updatedResult = { ...this.state.result, hits: updatedHits }
    this.setState({ result: updatedResult })
  }

  onChangeSearchTerm = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, result } = this.state

    if (!result) { return null; }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChangeSearchTerm}
          >
            Search
          </Search>
          <Table
            list={result.hits}
            searchTerm={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
      </div>
    );
  }
}

// ES6 arrow functions let you remove the block body, {}
const Search = ({ value, onChange, children }) => 
  <form>
    {children} <input 
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ list, searchTerm, onDismiss }) => 
  <div className="table">
    <h2>Welcome to the Road to learn React</h2>
    {list.filter(isSearched(searchTerm)).map(item => 
    <div key={item.objectID} className="table-row">
      <span style={largeColumn}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={midColumn}>{item.author}</span>
      <span style={smallColumn}>{item.num_comments}</span>
      <span style={smallColumn}>{item.points}</span>
      <span style={smallColumn}>
        <Button 
          onClick={() => onDismiss(item.objectID)}
          className="button-inline"
        >
          dismiss  
        </Button>
      </span>
    </div>
    )}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const largeColumn = {
  width: '40%'
}

const midColumn = {
  width: '30%'
}

const smallColumn = {
  width: '20%'
}

// const App= () => 
// <div className="App">
//   <h2>Welcome to the Road to learn React</h2>
//   {list.map(item => 
//     <div key={item.objectID}>
//       <span>
//         <a href={item.url}>{item.title}</a>
//       </span>
//       <span>{item.author}</span>
//       <span>{item.num_comments}</span>
//       <span>{item.points}</span>
//     </div>
//   )}
// </div>

export default App;
