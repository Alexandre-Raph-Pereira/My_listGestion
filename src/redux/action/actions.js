export const addElement = newElement => ({
    type: "ADD_ELEMENT",
    payload: newElement,
});

export const removeElement = id => ({
    type: "REMOVE_ELEMENT",
    payload: id,
});