const pool = require("../config/database");

const insertLike = (data, callback) => {
  console.log("data", data);
  pool.query(
    `INSERT INTO likes (
      post_id,
      liked_by_user_id,
      liked_date
    ) values (
      ?,
      ?,
      ?
    );`,
    [
      data.post_id,
      data.liked_by_user_id,
      data.liked_date
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectLike = (data, callback) => {
  pool.query(
    `SELECT * FROM likes WHERE post_id = ? AND liked_by_user_id = ?;`,
    [
      data.post_id,
      data.liked_by_user_id,
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteLike = (data, callback) => {
  pool.query(
    `DELETE FROM likes WHERE
      post_id = ? AND
      liked_by_user_id = ?;`,
    [
      data.post_id,
      data.liked_by_user_id
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

module.exports = {
  insertLike,
  selectLike,
  deleteLike
}