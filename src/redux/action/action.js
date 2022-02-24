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
