const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all Contact and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT u.user_name, t.contact_id, t.fullname, t.details FROM users AS u LEFT JOIN contacts AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a contact

router.post("/contacts", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, details } = req.body;
    const newContact = await pool.query(
      "INSERT INTO contacts (user_id, fullname, details) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, fullname, details]
    );

    res.json(newContact.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a Contact

router.put("/contacts/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, details } = req.body;
    const updateContact = await pool.query(
      "UPDATE contacts SET fullname = $1 , details= $2 WHERE contact_id = $3 AND user_id = $4 RETURNING *",
      [fullname, details, id, req.user.id]
    );

    if (updateContact.rows.length === 0) {
      return res.json("This Contact is not yours");
    }

    res.json("Contact was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a Contacts

router.delete("/contacts/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await pool.query(
      "DELETE FROM contacts WHERE contact_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteContact.rows.length === 0) {
      return res.json("This Contact is not yours");
    }

    res.json("Contact was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
