-- Get an user information from the database
SELECT id, name, lastname, ci, email
FROM "deportes-cp".users JOIN "deportes-cp".trainer ON user_id = id
WHERE id = :id
