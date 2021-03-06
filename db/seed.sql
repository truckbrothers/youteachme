CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    hash TEXT,
    user_image TEXT,
    mentor_status BOOLEAN
);

CREATE TABLE languages(
    language_id SERIAL PRIMARY KEY,
    language_name VARCHAR(50)
);

CREATE TABLE mentors(
    user_id INT REFERENCES users(user_id),
    language_id INT REFERENCES languages(language_id)
);

CREATE TABLE request(
    request_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    request_info VARCHAR(2500)
);

CREATE TABLE request_tags(
    request_id INT REFERENCES request(request_id),
    language_id INT REFERENCES languages(language_id)
);

CREATE TABLE chat(
    chat_id SERIAL PRIMARY KEY,
    request_id INT REFERENCES request(request_id),
    title VARCHAR(2500)
);

CREATE TABLE chat_users(
    chat_id INT REFERENCES chat(chat_id),
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE chat_messages(
    chat_id INT REFERENCES chat(chat_id),
    user_id INT REFERENCES users(user_id),
    message_text TEXT,
    message_id SERIAL PRIMARY KEY
);

INSERT INTO languages (language_name)
VALUES ('JavaScript'), 
       ('HTML'),
       ('CSS'),
       ('React'),
       ('SQL'),
       ('Redux'),
       ('Python'),
       ('Angular'),
       ('NodeJS'),
       ('TypeScript');