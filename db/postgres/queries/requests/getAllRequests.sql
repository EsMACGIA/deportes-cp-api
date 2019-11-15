SELECT R.id, status, name, retire, lastname, sex, birthday, ci, stock_number, description as class_description
FROM ("deportes-cp".request AS R JOIN "deportes-cp".athlete AS A ON A.id=R.athlete_id)
    JOIN "deportes-cp".class AS C ON C.id=R.class_id
