SELECT A.name AS Name, A.lastname AS Lastname, A.ci AS CI, A.stock_number AS Action_Number
FROM ("deportes-cp".class AS C 
      JOIN "deportes-cp".athlete_class AS AC ON C.id = AC.class_id) 
      JOIN "deportes-cp".athlete AS A ON A.id = AC.athlete_id
WHERE C.id = :id