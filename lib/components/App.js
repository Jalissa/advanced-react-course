import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';

class App extends Component{
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext(){
    return {store : this.props.store}
  }

  constructor(props) {
    super(props);

    this.state = this.props.store.getState();
  }

  state = this.props.store.getState();

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  };

  componentDidMount(){
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange)
  }

  componentWillUnmount(){
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render(){
    let { articles, searchTerm } = this.state;

    if(searchTerm){
      articles = pickBy(articles, (value) => {
        return value.title.match(searchTerm)
          || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.props.store.setSearchTerm}/>
        <ArticleList articles={articles}
        />
      </div>
    );
  }
}

export default App;