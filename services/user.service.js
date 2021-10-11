const pool = require("../config/database");

const insertUser = (data, callback) => {
  console.log(data);
  pool.query(
    `INSERT INTO users (
      username,
      email,
      password, 
      is_admin,
      posts_count,
      register_date
    ) values (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    );`,
    [
      data.username,
      data.email,
      data.password,
      data.is_admin,
      data.posts_count,
      data.register_date,
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectUsers = (callback) => {
  pool.query(
    `SELECT id, username, email, is_admin, register_date FROM users`,
    [],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectUserById = (id, callback) => {
  pool.query(
    `SELECT id, username, posts_count, email, profile_photo, is_admin, register_date FROM users WHERE id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const selectUserByEmail = (email, callback) => {
  pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const updateUserById = (data, callback) => {
  pool.query(
    `UPDATE users SET username = ?, email = ?, password = ?, is_admin = ?, register_date = ? WHERE id = ?`,
    [
      data.username,
      data.email,
      data.password,
      data.is_admin,
      data.register_date,
      data.id,
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const updateUserImageById = (id, profile_photo, callback) => {
  pool.query(
    `UPDATE users SET profile_photo = ?  WHERE id = ?`,
    [profile_photo, id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const removeUserImageById = (id, callback) => {
  pool.query(
    `UPDATE users SET profile_photo = ${null}  WHERE id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const deleteUserById = (data, callback) => {
  pool.query(
    `DELETE FROM users WHERE id = ?`,
    [data.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

module.exports = {
  insertUser,
  selectUsers,
  selectUserById,
  selectUserByEmail,
  updateUserById,
  updateUserImageById,
  removeUserImageById,
  deleteUserById,
};
