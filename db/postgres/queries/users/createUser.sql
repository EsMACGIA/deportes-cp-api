INSERT INTO "deportes-cp".users (id , email, password, name, lastname, type, ci )
VALUES ( DEFAULT,:email, :password, :name, :lastname, :type, :ci)
RETURNING *