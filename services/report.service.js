const pool = require("../config/database");

const insertReport = (data, callback) => {
  console.log("report insert data", data);
  pool.query(
    `INSERT INTO reports (
      post_id,
      reported_by_user_id,
      reported_date
    ) values (
      ?,
      ?,
      ?
    );`,
    [
      data.post_id,
      data.reported_by_user_id,
      data.reported_date
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectReport = (data, callback) => {
  pool.query(
    `SELECT * FROM reports WHERE post_id = ? AND reported_by_user_id = ?;`,
    [
      data.post_id,
      data.reported_by_user_id,
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteReport = (postId, callback) => {
  pool.query(
    `DELETE FROM reports WHERE
      post_id = ?;`,
    [
      postId
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
  insertReport,
  selectReport,
  deleteReport
}