const initState = {
    myList: []
}

export const addElement = (state = initState, action) => {
    switch(action.type) {
        case 'ADD_ELEMENT':
            return {...state, myList: state.myList.concat(action.payload)};
        case 'DELETE_ELEMENT':
            return { ...state, myList: [...state.myList.filter(myList => myList.id !== action.payload)] };
        default:
            return state;
    };
}