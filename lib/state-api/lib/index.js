class StateApi {

  constructor(rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date()
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;

  }

  mapIntoObject(arr){
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  getState = () => {
    return this.data;
  };

  lookupAuthor = (authorId) => {
    return this.data.authors[authorId];
  };

  subscribe = (callback) => {
    this.subscriptions[this.lastSubscriptionId] = callback;
    this.lastSubscriptionId++;

    return this.lastSubscriptionId++;

  };

  notifySusbcribers = () => {
    Object.values(this.subscriptions).forEach((cb) => cb());
  };

  unsubscribe = (subscriptionId) => {
    delete this.subscriptions[subscriptionId];
  };

  mergeWithState = (stateChange) => {
    this.data = {
      ...this.data,
      ...stateChange
    };

    this.notifySusbcribers();
  };

  setSearchTerm = (searchTerm) => {
    this.mergeWithState({ searchTerm });
  };

  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date()
      })
    }, 1000);
  };

}

export default StateApi;