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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list
    }
  }

  onDismiss = id => {
    // 該当idをlistから削除
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    // stateの更新
    this.setState({ list: updatedList })
  }

  render() {
    return (
      <div className="App">
        <h2>Welcome to the Road to learn React</h2>
        {this.state.list.map(item => 
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button 
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                dismiss  
              </button>
            </span>
          </div>
        )}
      </div>
    );
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
