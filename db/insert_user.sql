INSERT INTO users (username, hash, user_image, mentor_status)
VALUES (${username}, ${hash}, ${user_image}, ${mentor_status})
RETURNING *;