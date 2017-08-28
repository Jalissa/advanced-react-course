import React from 'react';
import storeProvider from './storeProvider';

class TimeStamp extends React.Component{

  render(){
    return (
      <div>
        {this.props.timestamp.toString()}
      </div>
    )
  }
}

const extraProps = (store) => {
  return {
    timestamp: store.getState().timestamp
  }
};

export default storeProvider(extraProps)(TimeStamp);