import { Type } from "../type/type";

export const addHead = (head) => {
  return {
    type: Type.HEAD,
    payload: head,
  };
};

export const addPhone = (phone) => {
  return {
    type: Type.PHONE,
    payload: phone,
  };
};

export const addId = (id) => {
  return {
    type: Type.ID,
    payload: id,
  };
};

export const addCust = (cust) => {
  return {
    type: Type.CUST,
    payload: cust,
  };
};

export const addPassbook = (passbook) => {
  return {
    type: Type.PASSBOOK,
    payload: passbook,
  };
};
