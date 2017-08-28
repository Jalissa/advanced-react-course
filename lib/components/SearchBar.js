import React from 'react';
import debounce from 'lodash.debounce';
import storeProvider from './storeProvider';

class SearchBar extends React.Component{
  state = {
    searchTerm: ''
  };

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300);

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.doSearch();
    });
  };

  render() {
    return (
      <input
        type="search"
        placeholder="Enter search term"
        onChange={this.handleSearch}
        value={this.state.searchTerm}
      />
    );
  }
}

export default storeProvider()(SearchBar);