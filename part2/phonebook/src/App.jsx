import { useState, useEffect } from "react";
import personService from "./services/Persons.jsx";
import "./index.css";

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.onchange} value={props.filter} />
    </div>
  );
};

const List = (props) => {
  return props.persons
    .filter((entry) =>
      entry.name.toLowerCase().startsWith(props.filter.toLowerCase())
    )
    .map((person) => (
      <div key={person.id} style={{ display: "flex" }}>
        <p>
          {person.name}: {person.number}
        </p>
        <button onClick={() => props.handledelete(person.id, person.name)}>
          delete
        </button>
      </div>
    ));
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addname}>
      <div>
        name: <input onChange={props.handlenamechange} value={props.newname} />
      </div>
      <div>
        number:{" "}
        <input onChange={props.handlenumberchange} value={props.newnumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message, styleclass }) => {
  if (message === null) {
    return null;
  }

  return <div className={styleclass}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [correctMessage, setCorrectMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const correctStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const addName = (event) => {
    event.preventDefault();
    const newId = persons.length
      ? Math.max(...persons.map((obj) => obj.id)) + 1
      : 1;
    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${newId}`,
    };
    const already = persons.find((entry) => entry.name === newName);
    if (already && already.number !== newPerson.number) {
      const isConfirmed = window.confirm(
        `${newPerson.name} is already added to the phonebook, replace the old number with the new one?`
      );
      if (isConfirmed) {
        personService
          .update(already.id, {
            ...already,
            number: newNumber,
          })
          .then((response) => {
            let test = persons.map((person) =>
              person.id !== already.id ? person : response
            );
            console.log("test", test);
            setPersons(test);
            setNewName("");
            setNewNumber("");
            displayCorrectMessage(`Added ${already.name}`);
          });
      }
      return;
    }

    if (!already) {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        displayCorrectMessage(`Added ${newPerson.name}`);
      });
    } else {
      window.alert(`${newName} already exists with the number ${newNumber}`);
    }
  };

  const deleteName = (id, name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`);
    if (isConfirmed) {
      personService
        .deleteEntry(id)
        .then(() => {
          displayCorrectMessage(`Deleted ${name}`);
        })
        .catch((error) => {
          displayErrorMessage(
            `Information of ${name} has already been removed from server`
          );
        });
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const displayCorrectMessage = (text) => {
    setCorrectMessage(text);
    setTimeout(() => {
      setCorrectMessage(null);
    }, 3000);
  };

  const displayErrorMessage = (text) => {
    setErrorMessage(text);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  useEffect(() => {
    personService.getAll("http://localhost:3001/persons").then((response) => {
      setPersons(response);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={correctMessage} styleclass="correct" />
      <Notification message={errorMessage} styleclass="error" />
      <Filter value={filter} onchange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        addname={addName}
        newname={newName}
        newnumber={newNumber}
        handlenamechange={handleNameChange}
        handlenumberchange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List persons={persons} filter={filter} handledelete={deleteName} />
    </div>
  );
};

export default App;
