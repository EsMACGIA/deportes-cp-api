-- Updates an user in the database
UPDATE "deportes-cp".users
SET name = :name,
WHERE email = :email
