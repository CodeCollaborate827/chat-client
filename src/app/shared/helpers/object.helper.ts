export const cleanObj = (obj: any): any => { 
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === undefined || obj[key] === '' || obj[key].length === 0) {
      delete obj[key];
    }
  }
  return obj;
}

export const isEmptyObj = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
}