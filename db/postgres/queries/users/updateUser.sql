-- Updates an user in the database
UPDATE "deportes-cp".users
SET name = :name,
    password = :password
WHERE email = :email
