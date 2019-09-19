SELECT request_info FROM request r
JOIN chat c
ON c.request_id = r.request_id
WHERE c.chat_id = $1;