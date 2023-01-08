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
const addTweet = tweet => {
  console.log("AddTweet Passed Tweet: ", tweet)
  return {
    type: ADD_TWEET,
    tweet
  };
};

// add tweet - thunk action creator
export const addNewTweet = (req) => async (dispatch) => {
  const tweet = await fetch('/api/tweets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  })
  dispatch(addTweet(req))
  console.log("Req: ", req)
  console.log("Tweet: ", tweet)
};



// reducer
const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET: {
      const currId = 4
      const tweet = action.tweet
      const newState = {
        id: currId,
        ...tweet
      };
      console.log("STATE: ", state)
      return {...state, 4 : newState};
    }
    default:
      return state;
  }
};

export default tweetsReducer;