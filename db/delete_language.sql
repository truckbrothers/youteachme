DELETE FROM mentors
WHERE user_id = ${user_id} AND language_id = ${language_id};
SELECT language_id FROM mentors
WHERE user_id = ${user_id};