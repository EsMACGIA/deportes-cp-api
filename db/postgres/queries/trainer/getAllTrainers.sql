-- Get all trainer in the database
SELECT U.id, name, lastname, email, ci
FROM ("deportes-cp".trainer JOIN "deportes-cp".users AS U ON user_id=id) 

