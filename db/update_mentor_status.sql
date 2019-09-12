UPDATE users
SET mentor_status = 't'
WHERE user_id = $1
RETURNING *;