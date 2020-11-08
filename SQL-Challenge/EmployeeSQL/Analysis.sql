
SELECT * FROM "Departments";
SELECT * FROM "Dept_Emp";
SELECT * FROM "Dept_Manager";
SELECT * FROM "Employees";
SELECT * FROM "Salaries";
SELECT * FROM "Titles";

------------------------------
-- Analysis Question # 1
SELECT e.emp_no, e.last_name, e.first_name, e.sex, s.salary
FROM "Employees" AS e
INNER JOIN "Salaries" AS s
ON e.emp_no = s.emp_no;

-- Analysis Question # 2
SELECT e.first_name, e.last_name, e.hire_date
FROM "Employees" AS e
WHERE EXTRACT(year FROM hire_date) = 1986;

-- Analysis Question # 3
SELECT d.dept_no, d.dept_name, dm.emp_no, e.last_name, e.first_name
FROM "Departments" AS d
INNER JOIN "Dept_Manager" AS dm
ON dm.dept_no = d.dept_no
INNER JOIN "Employees" AS e
ON e.emp_no = dm.emp_no;

-- Analysis Question # 4
SELECT e.emp_no, e.last_name, e.first_name, d.dept_name
FROM "Employees" AS e
JOIN "Dept_Emp" AS de
ON de.emp_no = e.emp_no
JOIN "Departments" AS d
ON d.dept_no = de.dept_no;

-- Analysis Question # 5
SELECT emp_no, first_name, last_name, sex
FROM "Employees"
WHERE first_name = 'Hercules' AND last_name LIKE 'B%';

-- Analysis Question # 6
