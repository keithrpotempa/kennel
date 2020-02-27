import AnimalManager from '../modules/AnimalManager'

export function firstLetterCase(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

export function splitTypeArray(arr){
   return arr.join(" and ");
}

export function handleDelete(props) {
  //invoke the delete function in AnimalManger and re-direct to the animal list.

  // Hacky workaround due to different views
  // having different formatting of their Ids 
  let animalId;
  if (props.animalId) {
    animalId = props.animalId
  } else if (props.animal.id) {
    animalId = props.animal.id
  }

  AnimalManager.delete(animalId).then(() =>
    props.history.push("/animals")
  );
};