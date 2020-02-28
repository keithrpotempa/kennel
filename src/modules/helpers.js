import ApiManager from '../modules/ApiManager'

export function firstLetterCase(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

export function splitTypeArray(arr){
   return arr.join(" and ");
}

export function handleDelete(dataType, id, props) {
  // TODO: confirm all handleDelete invoking use an id, 
  // as opposed to a prop

  ApiManager.delete(dataType, id).then(() =>
    props.history.push(`/${dataType}`)
  );
};

export function handleDeleteAnimal(props) {
  //invoke the delete function in AnimalManger and re-direct to the animal list.

  // Hacky workaround due to different views
  // having different formatting of their Ids 
  let animalId;
  if (props.animalId) {
    animalId = props.animalId;
  } else if (props.animal.id) {
    animalId = props.animal.id;
  } else if (Number.isInteger(props)) {
    animalId = props;
  }

  ApiManager.delete("animals", animalId).then(() =>
    props.history.push("/animals")
  );
};

export function handleDeleteEmployee(props) {
  //invoke the delete function in AnimalManger and re-direct to the animal list.

  // Hacky workaround due to different views
  // having different formatting of their Ids 
  let employeeId;
  if (props.employeeId) {
    employeeId = props.employeeId
  } else if (props.employee.id) {
    employeeId = props.employee.id
  }

  ApiManager.delete("employees", employeeId).then(() =>
    props.history.push("/employees")
  );
};