import { Type } from "../type/type";

const headState = {
  head: "home",
};

export const headReducer = (state = headState, { type, payload }) => {
  switch (type) {
    case Type.HEAD:
      return {
        ...state,
        head: payload,
      };
    default:
      return state;
  }
};

const phoneState = {
  phone: null,
};

export const phoneReducer = (state = phoneState, { type, payload }) => {
  switch (type) {
    case Type.PHONE:
      return {
        ...state,
        phone: payload,
      };
    default:
      return state;
  }
};
