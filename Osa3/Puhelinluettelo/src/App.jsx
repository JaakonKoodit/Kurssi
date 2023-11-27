import axios from "axios";
import { useState, useEffect } from "react";
import nameService from "./services/nameService";

const FilterInput = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

const NameList = ({ filter, table, setFunction, errorFunction }) => {
  const namesToShow = table.filter((person) => {
    return person.name.toLowerCase().includes(filter.toLowerCase());
  });
  const deletePerson = (personId, personName) => {
    if (window.confirm(`Do you want to delete ${personName}?`)) {
      nameService
        .delName(personId)
        .then(() => {
          setFunction(table.filter((person) => person.id !== personId));
        })
        .catch((error) => {
          console.log(error);
          errorFunction(`${personName} already deleted SOMEHOW????`);
        });
    }
  };
  return (
    <ul>
      {namesToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id, person.name)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

const InputField = ({ nameValue, onNameChange, numValue, onNumberChange }) => {
  return (
    <div>
      name: <input value={nameValue} onChange={onNameChange} />
      <br />
      number: <input value={numValue} onChange={onNumberChange} />
    </div>
  );
};

const SuccessMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="successMessage">{message}</div>;
};
const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="errorMessage">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    nameService
      .getAll()
      .then((initialNames) => {
        setPersons(initialNames);
      })
      .catch((error) => console.log("fail"));
  }, [persons]);

  const addSuccMsg = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const addErrorMsg = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ) &&
      window.confirm(`${newName} already added, change number?`)
    ) {
      const foundId = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ).id;

      nameService
        .update(foundId, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== foundId ? person : updatedPerson
            )
          );
          addSuccMsg(`${updatedPerson.name} updated`);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("saatana");
        });

      setNewName("");
      setNewNumber("");
    } else {
      nameService.create(personObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
      });
      addSuccMsg(`${newName} added`);
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <h2>Phonebook</h2>
      <div>
        Filter phonebook{" "}
        <FilterInput value={nameFilter} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addName}>
        <h2>Add new</h2>
        <div>
          <InputField
            nameValue={newName}
            onNameChange={handleNameChange}
            numValue={newNumber}
            onNumberChange={handleNumberChange}
          />
          <br />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <NameList
          filter={nameFilter}
          table={persons}
          setFunction={setPersons}
          errorFunction={addErrorMsg}
        />
      </div>
    </div>
  );
};

export default App;
