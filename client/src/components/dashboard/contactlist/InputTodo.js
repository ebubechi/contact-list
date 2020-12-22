import React, { Fragment, useState } from "react";

const InputTodo = ({ setContactsChange }) => {
  const [ fullname, setFullname] = useState("");
  const [ details, setDetails] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { fullname, details };
      const response = await fetch("http://localhost:5000/dashboard/contacts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setContactsChange(true);
      setFullname("");
      setDetails("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add fullname"
          className="form-control"
          value={fullname}
          onChange={e => setFullname(e.target.value)}
        />
        <input
          type="text"
          placeholder="add number or email"
          className="form-control"
          value={details}
          onChange={e => setDetails(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
