-- Get an user information from the database
SELECT *
FROM "deportes-cp".users JOIN "deportes-cp".trainer ON user_id = id
WHERE email = :email
