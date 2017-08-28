import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';
import TimeStamp from './TimeStamp';

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
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount(){
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render(){
    let { articles, searchTerm } = this.state;
    const searchRegExp = new RegExp(searchTerm, 'i');
    if(searchTerm){
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRegExp)
          || value.body.match(searchRegExp);
      });
    }

    return (
      <div>
        <TimeStamp />
        <SearchBar />
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default App;