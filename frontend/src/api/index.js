import axios from "axios";

const DATA_SERVER =  process.env.REACT_APP_BACKEND_ENDPOINT
const API_PREFIX = 'api'

console.log('ENV', process.env)
export const get = (endPoint, payload) =>
  axios
    .get(`${DATA_SERVER}/${API_PREFIX}/${endPoint}`, payload)
    .then(response => response.data)

export const post = (endPoint, payload, config) =>
{
  console.log(`endopint ${process.env.REACT_APP_BACKEND_ENDPOINT}`)
  return axios
    .post(`${DATA_SERVER}/${API_PREFIX}/${endPoint}`, payload, config)
    .then(response => response.data)
  }
export const put = (endPoint, payload, id) =>
  axios
    .put(`${DATA_SERVER}/${API_PREFIX}/${endPoint}/${id}`, payload)
    .then(response => response.data)

export const patch = (endPoint, payload, id) =>
  axios
    .patch(`${DATA_SERVER}/${API_PREFIX}/${endPoint}/${id}`, payload)
    .then(response => response.data)

export const remove = (endPoint, payload, config) =>
  axios
    .delete(`${DATA_SERVER}/${API_PREFIX}/${endPoint}`, payload, config)
    .then(response => response.data)

export const postForm = (path, params, method) => {
  method = method || 'post';

  let form = document.createElement('form')
  form.setAttribute('method', method)
  form.setAttribute('action', `${DATA_SERVER}/${API_PREFIX}/${path}`)

  for (let key in params) {
      if (params.hasOwnProperty(key)) {
          let hiddenField = document.createElement('input')
          hiddenField.setAttribute('type', 'hidden')
          hiddenField.setAttribute('name', key)
          hiddenField.setAttribute('value', params[key])
          form.appendChild(hiddenField)
      }
  }

  document.body.appendChild(form)
  form.submit()
};
