import React, {useState, useEffect} from 'react';
import ApiManager from '../../modules/ApiManager'
import './AnimalForm.css'

// AnimalForm serves as both new and edit forms

const AnimalForm = props => {
  const [animal, setAnimal] = useState({ name: "", breed: "", employeeId: 0 });
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = () => {
    return ApiManager.getAll("employees").then(employeesFromAPI => {
      setEmployees(employeesFromAPI)
    });
  };

  const handleFieldChange = evt => {
    const stateToChange = { ...animal };
    stateToChange[evt.target.id] = evt.target.value;
    setAnimal(stateToChange);
  };

  const constructAnimal = evt => {
    evt.preventDefault();
    if (animal.name === "" || animal.breed === "") {
      window.alert("Please input an animal name and breed");
    } else {
      setIsLoading(true);
      const animalToSave = {
        name: animal.name,
        breed: animal.breed,
        employeeId: parseInt(animal.employeeId)
      }
      // If this is an edit, we also need the id
      if (props.match.params.animalId) {
        animalToSave.id = props.match.params.animalId;
      }
      return animalToSave;
    }
  };

  const saveAnimal = (animal) => {
    // If the object has an id, it is an edit,
    // so we put/update
    if (animal.hasOwnProperty('id')) {
      ApiManager.update("animals", animal).then(() =>
          props.history.push("/animals")
        );
    // Otherwise, it is new, so we post
    } else {
      ApiManager.post("animals", animal).then(() => 
        props.history.push("/animals")
      );
    }
  }

  useEffect(() => {
    getEmployees();
    // If this is an edit, we need to get the entry-to-edit's details
    if (props.match.params.animalId) {
      ApiManager.get("animals", props.match.params.animalId)
        .then(animal => setAnimal(animal))
      setIsLoading(false);
    }
  }, []);


  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="name"
              placeholder="Animal name"
              value={animal.name}
            />
            <label htmlFor="animalName">Name</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="breed"
              placeholder="Breed"
              value={animal.breed}
            />
            <label htmlFor="breed">Breed</label>
          <select
              className="form-control"
              required
              id="employeeId"
              value={animal.employeeId}
              onChange={handleFieldChange}
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <label htmlFor="employeeId">Employee</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={(evt) => {
                const constructedAnimal = constructAnimal(evt);
                saveAnimal(constructedAnimal);
              }}
            >Submit</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default AnimalForm