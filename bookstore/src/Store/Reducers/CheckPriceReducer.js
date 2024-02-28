const INITIAL_VALUE = {
    fromPrice: 0,
    toPrice: 0,
    search:""
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
                return{
                    ...state,
                    search:action.payload
                }
        default:
            return state;
    }
}
