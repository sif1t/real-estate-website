import { FETCH_PROPERTIES, FETCH_PROPERTY_DETAILS, SET_LOADING, SET_ERROR } from './actionTypes';

export const fetchProperties = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        dispatch({
            type: FETCH_PROPERTIES,
            payload: data,
        });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const fetchPropertyDetails = (id) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();
        dispatch({
            type: FETCH_PROPERTY_DETAILS,
            payload: data,
        });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const setLoading = () => ({
    type: SET_LOADING,
});

export const setError = (error) => ({
    type: SET_ERROR,
    payload: error,
});