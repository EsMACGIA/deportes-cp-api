-- query that looks for a comission's classes
SELECT U.id as commission_id, U.email as comission_email, C.name as comission_name
FROM "deportes-cp".trainer_comission as TC JOIN "deportes-cp".comission as C ON C.user_id = TC.comission_id JOIN "deportes-cp".users AS U ON U.id = C.user_id 
WHERE trainer_id = :trainer_id