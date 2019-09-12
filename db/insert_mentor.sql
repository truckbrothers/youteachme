INSERT INTO mentors (user_id, language_id)
VALUES (${user_id}, ${language_id})
RETURNING *;