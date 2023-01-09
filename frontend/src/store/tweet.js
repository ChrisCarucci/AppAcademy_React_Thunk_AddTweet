const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_TWEET = 'tweet/addTweet';


// load tweets - regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

// get tweets - thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();

    dispatch(loadTweets(data));
    return data;
  }
};

// add tweet - regular action creator
const addTweet = (tweet) => {
  //console.log("AddTweet Passed Tweet: ", tweet)
  return {
    type: ADD_TWEET,
    tweet
  };
};

// add tweet - thunk action creator
export const addNewTweet = (tweet) => async (dispatch) => {
  const response = await fetch('/api/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tweet)
  })
  const newTweet = await response.json();
  console.log("New Tweet: ", newTweet)
  console.log("Payload: ", tweet)
  dispatch(addTweet(newTweet))
};

const preloadedState = {}

// reducer
const tweetsReducer = (state = preloadedState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET:
      return { ...state, tweet: [state.tweets, action.tweet] };
    default:
      return state;
  }
};

export default tweetsReducer;