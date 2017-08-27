import React from 'react';
import ArticleList from '../ArticleList';
import Article from '../Article';

// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('ArticleList', () => {

  const testProps = {
    articles: {
      a: {id: 'a'},
      b: {id: 'b'}
    },
    store: {
      lookupAuthor: jest.fn(() =>({}) )
    }
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );

    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});