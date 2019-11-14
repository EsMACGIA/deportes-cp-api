INSERT INTO "deportes-cp".athlete (ci, name, lastname, sex, birthday, stock_number)
VALUES (:ci, :name, :lastname, :sex, :birthday, :stock_number)
RETURNING *

