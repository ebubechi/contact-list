import React, { Fragment, useState, useEffect } from "react";
import EditContact from "./EditTodo";

const ListContacts = ({ allContacts, setContactsChange }) => {
  console.log(allContacts);
  const [contacts, setContacts] = useState([]); //empty array

  //delete todo function

  async function deleteContact(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/contacts/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setContacts(contacts.filter(contact => contact.contact_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setContacts(allContacts);
  }, [allContacts]);

  console.log(contacts);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {contacts.length !== 0 &&
            contacts[0].contact_id !== null &&
            contacts.map(contact => (
              <tr key={contact.contact_id}>
                
                <td>{contact.fullname}</td>
                <td>{contact.details}</td>
                <td>
                  <EditContact contact={contact} setContactsChange={setContactsChange} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteContact(contact.contact_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListContacts;
