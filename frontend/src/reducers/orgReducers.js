import { ORGANISATION_LIST_REQUEST, ORGANISATION_LIST_SUCCESS, ORGANISATION_LIST_FAIL,
    ORGANISATION_DETAILS_REQUEST, ORGANISATION_DETAILS_SUCCESS, ORGANISATION_DETAILS_FAIL,
    ORGANISATION_DELETE_REQUEST, ORGANISATION_DELETE_SUCCESS, ORGANISATION_DELETE_FAIL,
    ORGANISATION_CREATE_REQUEST, ORGANISATION_CREATE_SUCCESS, ORGANISATION_CREATE_FAIL, ORGANISATION_CREATE_RESET, 
    ORGANISATION_UPDATE_REQUEST, ORGANISATION_UPDATE_SUCCESS, ORGANISATION_UPDATE_FAIL, ORGANISATION_UPDATE_RESET,
    ORGANISATION_CREATE_REVIEW_REQUEST, ORGANISATION_CREATE_REVIEW_SUCCESS, 
    ORGANISATION_CREATE_REVIEW_FAIL, ORGANISATION_CREATE_REVIEW_RESET,
    ORGANISATION_TOP_REQUEST, ORGANISATION_TOP_SUCCESS, 
    ORGANISATION_TOP_FAIL } from '../constants/orgConstants'

export const organisationListReducer = (state = { organisations: [] }, action) => {
    switch (action.type) {
        case ORGANISATION_LIST_REQUEST:
            return { loading: true, organisations: [] }
        case ORGANISATION_LIST_SUCCESS:
            return { loading: false,  
                organisations: action.payload.organisations, 
                pages: action.payload.pages, 
                page: action.payload.page }
        case ORGANISATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }

}



export const organisationCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORGANISATION_CREATE_REQUEST:
            return { loading: true }
        case ORGANISATION_CREATE_SUCCESS:
            return { loading: false, organisationInfo: action.payload }
        case ORGANISATION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ORGANISATION_CREATE_RESET:
            return { }
        default:
            return state

    }

}
