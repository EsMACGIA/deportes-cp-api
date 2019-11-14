-- Updates an user in the database
UPDATE "deportes-cp".users
SET 
    password = :password
WHERE id = :id
