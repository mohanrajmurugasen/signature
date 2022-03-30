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
  phone: {
    bonus_month: null,
    chit_code: null,
    chit_code_id: null,
    chit_scheme_id: null,
    chit_scheme_name: null,
    customer_id: null,
    customer_name: null,
    id: null,
    is_archive: null,
    join_date: null,
    maturity_date: null,
    monthly_due: null,
    monthly_due_weight: null,
    no_of_months: null,
    pending_dues: null,
    scheme_based: null,
    setActive: null,
    total_paid_amount: null,
    transaction_date: null,
    transaction_id: null,
    transaction_time: null,
  },
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
  passbook: {
    bonus_month: 0,
    chit_code: 0,
    chit_code_id: 0,
    chit_scheme_id: 0,
    chit_scheme_name: 0,
    customer_id: 0,
    customer_name: 0,
    id: 0,
    is_archive: 0,
    join_date: 0,
    maturity_date: 0,
    monthly_due: 0,
    monthly_due_weight: 0,
    no_of_months: 0,
    pending_dues: 0,
    scheme_based: 0,
    setActive: 0,
    total_paid_amount: 0,
    transaction_date: 0,
    transaction_id: 0,
    transaction_time: 0,
  },
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
