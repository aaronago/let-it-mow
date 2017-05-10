import * as Cookies from 'js-cookie';
import {browserHistory} from 'react-router';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = (user) => ({
    type: FETCH_USER_SUCCESS,
    name: user.name,
    picture: user.profilePicUrl,
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
//--------------------USERS REQUEST -----------------------------------------//
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
    })
}

//--------------------LISTINGS ASYNC REQUEST---------------------------------//

export const fetchListings = () => dispatch => {
  console.log('fetching listing data....')
  return fetch('/api/listings')
  .then(response => response.json())
  .then(json => {
    dispatch(fetchListingsSuccess())
  })
  .catch(error => {
    dispatch(fetchListingsFailure())
  })
  }
