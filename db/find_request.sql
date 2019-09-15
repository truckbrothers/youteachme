SELECT * FROM request r
JOIN request_tags rq
ON rq.request_id = r.request_id
WHERE rq.language_id IN
(SELECT m.language_id FROM mentors m
WHERE m.user_id = $1)