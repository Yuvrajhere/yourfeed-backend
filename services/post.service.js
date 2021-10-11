const pool = require("../config/database");

const insertPost = (data, callback) => {
  pool.query(
    `INSERT INTO posts (
      posted_by_user_id,
      category_id,
      artist_name,
      artist_content_link,
      title,
      description,
      likes_count,
      comments_count,
      reports_count,
      posted_date
    ) values (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
    );`,
    [
      data.postedByUserId,
      data.categoryId,
      data.artistName,
      data.artistContentLink,
      data.title,
      data.description,
      data.likesCount,
      data.commentsCount,
      data.reportsCount,
      data.postedDate,
    ],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectPosts = (callback) => {
  pool.query(
    `SELECT c.category_name, p.id, p.artist_name, p.artist_content_link, 
      p.title, p.description, p.image, p.likes_count, p.comments_count, 
      p.posted_date, u.id as user_id, u.username, u.profile_photo
    FROM categories c, posts p, users u
    WHERE c.id = p.category_id AND p.posted_by_user_id = u.id
    ORDER BY p.posted_date desc;`,
    [],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectPostsById = (id, callback) => {
  pool.query(
    `SELECT c.category_name, p.id, p.artist_name, p.artist_content_link, 
      p.title, p.description, p.image, p.likes_count, p.comments_count, 
      p.posted_date, u.id as user_id, u.username, u.profile_photo
    FROM categories c, posts p, users u
    WHERE c.id = p.category_id AND u.id = ? AND p.posted_by_user_id = u.id
    ORDER BY p.posted_date desc;`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const selectReportedPosts = (callback) => {
  pool.query(
    `SELECT 
      c.category_name, p.id, p.artist_name, p.artist_content_link, 
      p.title, p.description, p.image, p.likes_count, p.comments_count,  p.reports_count,
      p.posted_date, u.username, u.profile_photo
    FROM categories c, posts p, users u
    WHERE c.id = p.category_id AND p.posted_by_user_id = u.id AND p.reports_count > 0
    ORDER BY p.posted_date desc;`,
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const updatePostImageById = (id, image, callback) => {
  pool.query(
    `UPDATE posts SET image = ?  WHERE id = ?`,
    [image, id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const deletePostById = (id, callback) => {
  pool.query(
    `DELETE FROM likes WHERE post_id = ?;`,
    [id],
    (error, results1, fields) => {
      if (error) {
        return callback(error);
      }
      pool.query(
        `DELETE FROM comments WHERE post_id = ?;`,
        [id],
        (error, results2, fields) => {
          if (error) {
            return callback(error);
          }
          pool.query(
            `DELETE FROM reports WHERE post_id = ?;`,
            [id],
            (error, results3, fields) => {
              if (error) {
                return callback(error);
              }
              pool.query(
                `DELETE FROM posts WHERE id = ?;`,
                [id],
                (error, results4, fields) => {
                  if (error) {
                    return callback(error);
                  }
                  return callback(null, results4);
                }
              );
            }
          );
        }
      );
    }
  );
};

//23:37:17	delete from posts where id = 9	Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails (`dbms_mini_project`.`comments`, CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`))	0.016 sec

module.exports = {
  insertPost,
  selectPosts,
  selectPostsById,
  selectReportedPosts,
  updatePostImageById,
  deletePostById,
};
