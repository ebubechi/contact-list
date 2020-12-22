import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./contactlist/InputTodo";
import ListTodos from "./contactlist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [contactsChange, setContactsChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllContacts(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setContactsChange(false);
  }, [contactsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name} 's Contact List</h2>
        <button onClick={e => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputTodo setContactsChange={setContactsChange} />
      <ListTodos allContacts={allContacts} setContactsChange={setContactsChange} />
    </div>
  );
};

export default Dashboard;
