import * as Cookies from 'js-cookie';
import {browserHistory} from 'react-router';
import io from 'socket.io-client';

export const socket = io.connect();

//----------- Reducer Actions -------------//

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    name: user.name,
    userId: user.googleID,
    picture: user.profilePicUrl,
    _id: user._id
});

export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const fetchUserFailure = (error) => ({
    type: FETCH_USER_FAILURE,
    error,
});

export const FETCH_LISTINGS_SUCCESS = 'FETCH_LISTINGS_SUCCESS';
export const fetchListingsSuccess = (listings) => ({
    type: FETCH_LISTINGS_SUCCESS,
    listings
});

export const FETCH_LISTINGS_FAILURE = 'FETCH_LISTINGS_FAILURE';
export const fetchListingsFailure = (error) => ({
    type: FETCH_LISTINGS_FAILURE,
    error,
});

export const FETCH_LISTING_SUCCESS = 'FETCH_LISTING_SUCCESS';
export const fetchListingSuccess = (listing) => ({
    type: FETCH_LISTING_SUCCESS,
    listing
});

export const FETCH_LISTING_FAILURE = 'FETCH_LISTING_FAILURE';
export const fetchListingFailure = (error) => ({
    type: FETCH_LISTING_FAILURE,
    error,
});

export const FETCH_USER_LISTINGS_SUCCESS = 'FETCH_USER_LISTINGS_SUCCESS';
export const fetchUserListingsSuccess = (userListings) => ({
    type: FETCH_USER_LISTINGS_SUCCESS,
    userListings
  });

export const FETCH_USER_LISTINGS_FAILURE= 'FETCH_USER_LISTINGS_FAILURE';
export const fetchUserListingsFailure = (error) => ({
      type: FETCH_USER_LISTINGS_FAILURE,
      error
    });

export const FETCH_MORE_FROM_SELLER_SUCCESS = 'FETCH_MORE_FROM_SELLER_SUCCESS';
export const fetchMoreFromSellerSuccess = (allUserListings) => ({
    type: FETCH_MORE_FROM_SELLER_SUCCESS,
    allUserListings
  });

export const FETCH_MORE_FROM_SELLER_FAILURE= 'FETCH_MORE_FROM_SELLER_FAILURE';
export const fetchMoreFromSellerFailure = (error) => ({
      type: FETCH_MORE_FROM_SELLER_FAILURE,
      error
    });
//-----------Conversation Action Types-------------//

export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const fetchConversationsSuccess = (conversations, unreadCount) => ({
  type: FETCH_CONVERSATIONS_SUCCESS,
  conversations,
  unreadCount
});

export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';
export const fetchConversationsFailure = (err) => ({
  type: FETCH_CONVERSATIONS_FAILURE,
  err
});

export const FETCH_CONVERSATION_SUCCESS = 'FETCH_CONVERSATION_SUCCESS';
export const fetchConversationSuccess = (messages) => ({
  type: FETCH_CONVERSATION_SUCCESS,
  messages
});

export const FETCH_CONVERSATION_FAILURE = 'FETCH_CONVERSATION_FAILURE';
export const fetchConversationFailure = (err) => ({
  type: FETCH_CONVERSATION_FAILURE,
  err
});

//-----------User/Auth Async Actions-------------//

export const fetchUser = () => dispatch => {
    const accessToken = Cookies.get('accessToken');
    return fetch(`/api/auth/me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            Cookies.remove('accessToken');
            browserHistory.replace('/login');
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(user => {
        dispatch(fetchUserSuccess(user));
    })
    .catch(error => {
        dispatch(fetchUserFailure(error));
    });
};

//----Create Listing Async Action----------//

export const createListing = (values) => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/listing',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    })
    .then(() => dispatch(fetchUserListings()))

    .catch(error => {
      console.error(error);
    });
};

//-----------FetchAllListing Async Action-------------//

export const fetchListings = () => dispatch => {
  return fetch('/api/listings')
  .then(response => response.json())
  .then(json => {
    dispatch(fetchListingsSuccess(json));
  })
  .catch(error => {
    dispatch(fetchListingsFailure());
  });
};

//-----------Fetch Single Listing Async Action-------------//

export const fetchListing = id => dispatch => {

  return fetch(`/api/listing/${id}`)
    .then(response => response.json())
    .then(listing => {
      dispatch(fetchListingSuccess(listing[0]));
    })
    .catch(error => {
      dispatch(fetchListingFailure);
    });
};

//----------- FetchAllListings For A User Async Action-------------//

export const fetchUserListings = () => (dispatch) => {
  const accessToken = Cookies.get('accessToken');
  return fetch('/api/mylistings', {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch(fetchUserListingsSuccess(json));
  })
  .catch(error => {
    dispatch(fetchUserListingsFailure());
  });
};

//----------- FetchAllListings From the same User Async Action-------------//

export const fetchMoreFromSeller = (createdBy) => (dispatch) => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/listings/${createdBy._id}`, {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch(fetchMoreFromSellerSuccess(json));
  })
  .catch(error => {
    dispatch(fetchUserListingsFailure());
  });
};
//-----------Delete Listing Async Action-------------//

export const deleteListing = (userId, id) => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/listing/${userId}/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(() => dispatch(fetchUserListings()))
    .catch((err) =>dispatch(fetchUserListingsFailure(err)));
};


//----------- Messaging Actions -------------//

export const fetchConversations = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch(`/api/chat`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    const user = json.user;
    const count = json.conversations.reduce((a, b) => {

      const unreads = b.message[0].read || b.message[0].author._id === user ? 0 : 1;
      return a + unreads;
    },0);

    console.log(count);



    dispatch(fetchConversationsSuccess(json.conversations, count));
  })
  .catch(err => dispatch(fetchConversationsFailure(err)));
};

export const fetchConversation = (id) => dispatch => {
  const accessToken = Cookies.get('accessToken');

  return fetch(`/api/chat/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => {
    dispatch(fetchConversationSuccess(json.messages));
  })
  .catch(err => dispatch(fetchConversationFailure(err)));
};

export const sendReply = (data) => dispatch => {

  const accessToken = Cookies.get('accessToken');

  return fetch(`/api/chat/${data.conversationId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({message: data.body})
    })
    .then((response) => response.json())
    .then(json => {
    })
    .catch(error => {
      console.error(error);
    });

};

export const startConversation = (data) => dispatch => {

  const accessToken = Cookies.get('accessToken');

  return fetch(`/api/chat/new`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(json => {

    })
    .catch(error => {
      console.error(error);
    });

};

export const markRead = messageId => dispatch => {

  const accessToken = Cookies.get('accessToken');

  return fetch(`/api/chat/${messageId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
    })
    .then((response) => response.json())
    .then(json => {
    })
    .catch(error => {
      console.error(error);
    });

};
