-- query that looks for a comission's trainer
SELECT name, lastname, ci, email
FROM ("deportes-cp".trainer_comission AS T_C JOIN "deportes-cp".trainer AS T ON T_C.trainer_id = T.user_id) 
    JOIN "deportes-cp".users AS U on U.id = T.user_id
WHERE T_C.comission_id = :id