import React, { Fragment, useState } from "react";

const EditContact = ({ contact, setContactsChange }) => {
  //editText function

  const editText = async id => {
    try {
      const body = { fullname, details };

      console.log(JSON.stringify(body));


      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/dashboard/contacts/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      setContactsChange(true);

      // window.location = "/dashboard";
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log(contact.fullname)
  console.log(contact.details)
 
  const [fullname, setFullname] = useState(contact.fullname);
  const [details, setDetails] = useState(contact.details);


  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${contact.contact_id}`}
      >
        Edit
      </button>
      {/* id = "id21"*/}
      <div
        className="modal"
        id={`id${contact.contact_id}`}
        onClick={() => { setFullname(contact.fullname); setDetails(contact.details);}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit contact</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => { setFullname(contact.fullname); setDetails(contact.details)}}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                name="fullname"
                value={fullname}
                onChange={e => setFullname(e.target.value)}
              />
              <br/>
              <input
              type="text"
              className="form-control"
              name="details"
              value={details}
              onChange={e => setDetails(e.target.value)}
             />
            </div>

            <div className="modal-footer"> 
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(contact.contact_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => { setFullname(contact.fullname); setDetails(contact.details)}}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditContact;
