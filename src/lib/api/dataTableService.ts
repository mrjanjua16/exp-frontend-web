import api from "./api";

export const listRecords = (resource, params) => {
  return api.get(`${resource}/`, { params });
};

export const updateRecord = (resource, id, payload) => {
  return api.patch(`${resource}/${id}`, payload);
};

export const deleteRecord = (resource, id) => {
  return api.delete(`${resource}/${id}`);
};

export default { listRecords, updateRecord, deleteRecord };