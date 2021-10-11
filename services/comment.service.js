const pool = require("../config/database");

const insertComment = (data, callback) => {
  console.log("data", data);
  pool.query(
    `INSERT INTO comments (
      post_id,
      comment_by_user_id,
      comment_text,
      comment_date
    ) values (
      ?,
      ?,
      ?,
      ?
    );`,
    [
      data.post_id,
      data.comment_by_user_id,
      data.comment_text,
      data.comment_date
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectRecent2Comments = (id, callback) => {
  pool.query(
    `SELECT 
      c.id, c.post_id, c.comment_by_user_id, 
      c.comment_text, c.comment_date, u.username
    FROM comments c, users u
    WHERE u.id = c.comment_by_user_id AND c.post_id = ?
    ORDER BY comment_date DESC
    LIMIT 2;`,
    [
      id
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectComments = (id, callback) => {
  pool.query(
    `SELECT 
      c.id, c.post_id, c.comment_by_user_id, 
      c.comment_text, c.comment_date, u.username
    FROM comments c, users u
    WHERE u.id = c.comment_by_user_id AND c.post_id = ?
    ORDER BY comment_date DESC;`,
    [
      id
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteComment = (id, callback) => {
  pool.query(
    `DELETE FROM comments WHERE
      id = ?;`,
    [
      id
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const updateComment = (comment, callback) => {
  pool.query(
    `UPDATE comments SET comment_text = ? , comment_date = ?  WHERE id = ?`,
    [comment.comment_text, comment.comment_date, comment.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

module.exports = {
  insertComment,
  deleteComment,
  selectComments,
  selectRecent2Comments,
  updateComment
}