import React from 'react';
import storeProvider from './storeProvider';

class TimeStamp extends React.Component{

  render(){
    return (
      <div>
        {this.props.timestamp}
      </div>
    )
  }
}

const timeDisplay = timestamp =>
  timestamp.toLocaleTimeString([], {hour:'2-digit', minute: '2-digit'});

const extraProps = (store) => {
  return {
    timestamp: timeDisplay(store.getState().timestamp)
  }
};

export default storeProvider(extraProps)(TimeStamp);