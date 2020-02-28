import ApiManager from '../modules/ApiManager'

export function firstLetterCase(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

export function splitTypeArray(arr){
   return arr.join(" and ");
}

export function handleDelete(dataType, id, props) {
  ApiManager.delete(dataType, id).then(() =>
    props.history.push(`/${dataType}`)
  );
};