import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item => {
  return item.title.toLowerCase().includes(searchTerm.toLowerCase())
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list,
      searchTerm: '',
    }
  }

  onDismiss = id => {
    // 該当idをlistから削除
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    // stateの更新
    this.setState({ list: updatedList })
  }

  onChangeSearchTerm = event => {
    this.setState({ searchTerm: event.target.value })
  }

  render() {
    const { searchTerm, list } = this.state
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onChangeSearchTerm}
        />
        <Table
          list={list}
          searchTerm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props
    return(
      <form>
        <input 
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, searchTerm, onDismiss } = this.props
    return(
      <>
        <h2>Welcome to the Road to learn React</h2>
        {list.filter(isSearched(searchTerm)).map(item => 
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button 
                onClick={() => onDismiss(item.objectID)}
                type="button"
              >
                dismiss  
              </button>
            </span>
          </div>
        )}
      </>
    )
  }
}


// function App() {
//   return (
//     <div className="App">
//       <h2>Welcome to the Road to learn React</h2>
//       {list.map(item => 
//         <div key={item.objectID}>
//           <span>
//             <a href={item.url}>{item.title}</a>
//           </span>
//           <span>{item.author}</span>
//           <span>{item.num_comments}</span>
//           <span>{item.points}</span>
//         </div>
//       )}
//     </div>
//   );
// }

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
