CREATE VIEW topics_created_by_month AS
  SELECT TO_CHAR(created_at, 'Month') as month, count(id) as topics_created
    FROM topics
    WHERE TO_CHAR(created_at, 'Year') = TO_CHAR(CURRENT_DATE, 'Year')
    GROUP BY TO_CHAR(created_at, 'Month');
