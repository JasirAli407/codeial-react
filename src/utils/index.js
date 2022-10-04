import {toast} from 'react-toastify'

export * from './constants';

export const getFormBody = (params) => { 
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);
    // console.log('encoded key:',encodedKey, '  ',"encodedValue:",encodedValue);
    formBody.push(encodedKey + '=' + encodedValue);
  }
// console.log('formbody',formBody);
// console.log('formBody.join', formBody.join('&'));
  return formBody.join('&');
};


// helper functions for persisting user

export const setItemInLocalStorage = (key ,value)=>{
  if(!key || !value){
    return console.error('Cannot store in LS')
  }
  const valueToStore = typeof value !== 'string'? JSON.stringify(value): value;
  localStorage.setItem(key, valueToStore) 
}

export const getItemFromLocalStorage = (key)=>{
   if(!key){
   return console.error('Cannot get the value from LS')
   }
  return  localStorage.getItem(key)
}

export const removeItemFromLocalStorage = (key)=>{
  if(!key){
    return console.error('Cannot remove from LS')
    }
    localStorage.removeItem(key);
}

// toastify

export const notify = (msg, type) => {
  const options = {
    position: 'top-right',
    hideProgressBar: false,
  };
  type ? toast[type](msg, options) : toast(msg, options);
};
