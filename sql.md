Given a table of candidates and their skills, you're tasked with finding the candidates best suited for an open Data Science job. You want to find candidates who are proficient in Python, Tableau, and PostgreSQL.

Write a query to list the candidates who possess all of the required skills for the job. Sort the the output by candidate ID in ascending order.


```sql
select 
  table0.candidate_id 
from 
  candidates as table0 
  inner join (
    select 
      table1.candidate_id, 
      table1.skill, 
      table2.skill as skill2 
    from 
      candidates as table1 
      inner join (
        SELECT 
          * 
        FROM 
          candidates 
        where 
          skill in ('Python')
      ) as table2 on table1.candidate_id = table2.candidate_id 
    where 
      table1.skill in ('Tableau')
  ) as table3 on table0.candidate_id = table3.candidate_id 
where 
  table0.skill in ('PostgreSQL')
 ```

```sql
SELECT
  candidate_id
FROM candidates
WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')
GROUP BY candidate_id
having count(skill) = 3
ORDER BY candidate_id
```



