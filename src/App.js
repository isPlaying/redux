import React from 'react';
import { createStore } from 'redux';

const init = {
  inputValue: '',
  list: []
};
const reducer = (state = init, action) => {
  switch (action.type) {
    case 'change':
      return { ...state, inputValue: action.payload };
    case 'add':
      return {
        ...state,
        inputValue: '',
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }
};
const store = createStore(reducer);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleStore = this.handleStore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = store.getState();
    this.add = this.add.bind(this);
    // store.subscribe(this.handleStore);
    store.subscribe(() => this.setState(store.getState()));
  }
  handleStore() {
    this.setState(store.getState());
  }
  handleChange(e) {
    store.dispatch({
      type: 'change',
      payload: e.target.value
    });
  }
  add() {
    store.dispatch({
      type: 'add',
      payload: this.state.inputValue
    });
  }
  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button onClick={this.add}>add</button>
        <ul>
          {this.state.list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;
