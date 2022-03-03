import { Type } from "../type/type";

const headState = {
  head: "main",
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

const idState = {
  id: null,
};

export const idReducer = (state = idState, { type, payload }) => {
  switch (type) {
    case Type.ID:
      return {
        ...state,
        id: payload,
      };
    default:
      return state;
  }
};

const custState = {
  cust: null,
};

export const custReducer = (state = custState, { type, payload }) => {
  switch (type) {
    case Type.CUST:
      return {
        ...state,
        cust: payload,
      };
    default:
      return state;
  }
};

const passbookState = {
  passbook: null,
};

export const passbookReducer = (state = passbookState, { type, payload }) => {
  switch (type) {
    case Type.PASSBOOK:
      return {
        ...state,
        passbook: payload,
      };
    default:
      return state;
  }
};
