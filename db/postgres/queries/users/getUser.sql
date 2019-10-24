-- Get an user information from the database
SELECT *
FROM "deportes-cp".users
WHERE email = :email
