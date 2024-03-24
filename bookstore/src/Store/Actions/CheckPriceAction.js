
export const fromPrice = (payload) => {
  return {
    type: 'FROM_PRICE',
    payload
  };
};

export const toPrice = (payload) => {
  return {
    type: 'TO_PRICE',
    payload
  };
};

export const cartNumber = (payload) => {
  return {
    type: 'CART_COUNTER',
    payload
  };
};

export const search = (payload) => {
  return {
    type: "setSearch",
    payload
  }
}
