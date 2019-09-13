INSERT INTO request (user_id, request_info)
VALUES (${user_id}, ${request_info})
RETURNING *;