-- Get a trainer information from the database
SELECT U.id, U.name, lastname, email, ci, D.name as discipline
FROM ("deportes-cp".trainer JOIN "deportes-cp".users AS U ON user_id=id) JOIN "deportes-cp".discipline AS D ON D.id = discipline_id
WHERE email = :email
