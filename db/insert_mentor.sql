INSERT INTO mentors (user_id, language_id)
VALUES (${user_id}, ${language_id});

SELECT language_id FROM mentors
WHERE user_id = ${user_id};