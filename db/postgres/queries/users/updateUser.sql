-- Updates an user in the database
UPDATE "deportes-cp".users
SET name = :name,
    password = :password,
    email = :email,
    ci = :ci,
    type = :type
WHERE id = :id
