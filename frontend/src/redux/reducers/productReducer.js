import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAILURE,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    CLEAR_ERRORS
} from '../constants/productConstants';

export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                loaded: false,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                loaded: true,
                products: action.payload.results,
                productsCount: action.payload.count,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }

        case ALL_PRODUCT_FAILURE:
            return {
                loading: false,
                loaded: false,
                error: action.payload.error
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}

export const productDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                loaded: false,
                ...state
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                loaded: true,
                product: action.payload.result,
            }

        case PRODUCT_DETAILS_FAILURE:
            return {
                loading: false,
                loaded: false,
                error: action.payload.error
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}