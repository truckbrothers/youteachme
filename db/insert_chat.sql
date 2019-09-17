INSERT INTO chat (request_id, title)
VALUES (${request_id}, ${title})
RETURNING *;