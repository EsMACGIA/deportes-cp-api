INSERT INTO "deportes-cp".athlete (ci, name, lastname, sex, birthday, stock_number)
VALUES (NULL, :name, :lastname, :sex, :birthday, :stock_number)
RETURNING *

