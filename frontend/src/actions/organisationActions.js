import axios from 'axios'
import { ORGANISATION_LIST_REQUEST, ORGANISATION_LIST_SUCCESS, ORGANISATION_LIST_FAIL,
    ORGANISATION_DETAILS_REQUEST, ORGANISATION_DETAILS_SUCCESS, ORGANISATION_DETAILS_FAIL,
ORGANISATION_DELETE_SUCCESS, ORGANISATION_DELETE_REQUEST, ORGANISATION_DELETE_FAIL,
ORGANISATION_CREATE_REQUEST, ORGANISATION_CREATE_SUCCESS, ORGANISATION_CREATE_FAIL,
ORGANISATION_UPDATE_REQUEST, ORGANISATION_UPDATE_SUCCESS, ORGANISATION_UPDATE_FAIL,
ORGANISATION_CREATE_REVIEW_REQUEST, ORGANISATION_CREATE_REVIEW_SUCCESS, ORGANISATION_CREATE_REVIEW_FAIL,
ORGANISATION_TOP_REQUEST, ORGANISATION_TOP_SUCCESS, ORGANISATION_TOP_FAIL} from '../constants/orgConstants'


export const listOrganisations = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: ORGANISATION_LIST_REQUEST })

        const { data } = await axios.get(`/api/organisations?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch ({
            type: ORGANISATION_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch ({
            type: ORGANISATION_LIST_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })


    }

}

/*
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch ({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch ({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })


    }

}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })   

    } catch (error) {
        dispatch ({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })
    }
}
 */
export const createOrganisation = (name, address, town, country, phone, email, segment, orgtype, size, rating) => async (dispatch) => {
    try {
      dispatch({
        type: ORGANISATION_CREATE_REQUEST,
      })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            },
        }
  
      const { data } = await axios.post(
        '/api/organisations',
        { name,
            address,
            town,
            country ,
            phone,
            email,    
            segment,
            orgtype,
            size,
            rating },
        config
      )
  
      dispatch({
        type: ORGANISATION_CREATE_SUCCESS,
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: ORGANISATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  /*
export const createOrganisationTwo = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORGANISATION_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.post(`/api/organisations`, {}, config)

        dispatch({
            type: ORGANISATION_CREATE_SUCCESS,
            payload: data
        })   

    } catch (error) {
        dispatch ({
            type: ORGANISATION_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })
    }
} */

/*

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })   

    } catch (error) {
        dispatch ({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })   

    } catch (error) {
        dispatch ({
            type: PRODUCT_CREATE_REVIEW_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top`)

        dispatch ({
            type: PRODUCT_TOP_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch ({
            type: PRODUCT_TOP_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message, 
        })


    }

}*/