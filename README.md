# unitra-backend

## 1. Setup database

This application requires MySQL server to be running on your machine.
To set this up, follow the below steps:

#### 1. Install MySQL
```bash
brew install mysql
```

#### 2. Run MySQL Server on your machine
```bash
mysql.server start
```

#### 3. Open MySQL console
```bash
mysql -u root
```

#### 4. Setup password for the `root` user (safety first)
*select database*
```sql
USE mysql;
```
*set your new password for the root user*
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'ROOT_PASSWORD';
```
*refresh credentials*
```sql
FLUSH PRIVILEGES;
```
*quit*
```sql
\q
```

*restart MySQL server*
```bash
mysql.server restart
```

#### 5. Open MySQL console with your new password
```bash
mysql -u root -p
```

#### 6. Create a new database and a new user that has access to it
*create the database (you can choose whatever name you want)*
```sql
CREATE DATABASE unitra;
```
*create a user that will be granted access to your new database*
```sql
CREATE USER 'unitra'@'localhost' IDENTIFIED BY 'USER_PASSWORD';
```
*grant the user access to your database*
```sql
GRANT ALL ON unitra.* TO 'unitra'@'localhost'
```
*refresh credentials*
```sql
FLUSH PRIVILEGES;
```
*quit*
```sql
\q
```

## 2. Setup database connection and run migrations

#### 1. Setup connection to the database
edit the `./knexfile.js` file and insert credentials for the user and the name of the database you just created

#### 2. Install dependencies
```bash
npm install
```

#### 3. Run migrations
```bash
knex migrate:latest
```

## 3. Run the app
```bash
npm start
```
