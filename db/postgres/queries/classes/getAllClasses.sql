SELECT C.id, description, trainer_id, T.name as trainer_name, T.lastname AS trainer_lastname, T.ci AS trainer_ci, email AS trainer_email, COM.user_id AS comission_id, COM.name as comission_name
FROM (("deportes-cp".class AS C Join "deportes-cp".comission AS COM ON COM.user_id=comission_id)
      LEFT JOIN "deportes-cp".trainer AS T ON T.user_id = C.trainer_id)
      LEFT JOIN "deportes-cp".users AS U ON T.user_id = U.id