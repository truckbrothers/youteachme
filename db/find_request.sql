SELECT DISTINCT r.request_id, c.chat_id, r.request_info, r.user_id FROM request r
JOIN request_tags rq
ON rq.request_id = r.request_id
JOIN chat c
ON c.request_id = r.request_id
WHERE rq.language_id IN
(SELECT m.language_id FROM mentors m
WHERE m.user_id = $1);