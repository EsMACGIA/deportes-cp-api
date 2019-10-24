-- Updates an user in the database
UPDATE "deportes-cp".users
SET name = :name,
    lastname = :lastname,
    password = :password,
    type = :type
WHERE email = :email
