-- Updates an athlete in the database
UPDATE "deportes-cp".athlete
SET name = :name,
    lastname = :lastname,
    sex = :sex,
    birthday = :birthday ,
    ci = :ci,
    stock_number = :stock_number
WHERE id = :id
