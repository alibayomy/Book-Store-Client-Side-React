
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

export const categoryFilter = (payload) => {
  return {
    type: 'CATEGORY_FILTER',
    payload
  };
};

export const publisherFilter = (payload) => {
  return {
    type: 'PUBLISHER_FILTER',
    payload
  };
};

export const search = (payload) => {
  return {
    type: "setSearch",
    payload
  }
}
