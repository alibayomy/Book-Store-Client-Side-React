const INITIAL_VALUE = {
    fromPrice: 0,
    toPrice: 0,
    cartCounter: 0,
    search: "",
    categoryFilter: 0,
    publisherFilter: 0
}

export default function priceCheck(state = INITIAL_VALUE, action) {

    switch (action.type) {

        case 'FROM_PRICE':
            return {
                ...state,
                fromPrice: action.payload,
            }

        case 'TO_PRICE':
            return {
                ...state,
                toPrice: action.payload,
            };

        case 'setSearch':
            return {
                ...state,
                search: action.payload
            }

        case 'CART_COUNTER':
            return {
                ...state,
                cartCounter: action.payload,
            };

        case 'CATEGORY_FILTER':
            return {
                ...state,
                categoryFilter: action.payload,
            };

        case 'PUBLISHER_FILTER':
            return {
                ...state,
                publisherFilter: action.payload,
            };

        default:
            return state;
    }
}
