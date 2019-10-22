INSERT INTO "deportes-cp".users (id , email, password, name, type, ci )
VALUES ( DEFAULT,:email, :password, :name, :type, :ci)
RETURNING *