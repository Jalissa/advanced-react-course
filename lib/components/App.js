import React, {Component} from 'react';
import ArticleList from './ArticleList';


class App extends Component{

  constructor(props) {
    super(props);

    this.state = this.props.store.getState();
  }

  render(){
    return (
      <ArticleList
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }
}

export default App;