# New Life RP - PHP Panel (MySQL)
This package contains a PHP-backed panel for New Life RP with real login/register using MySQL.
## Important files
- api/config.php -> fill DB credentials
- api/db.php -> PDO connection
- api/register.php -> register endpoint (uses password_hash)
- api/login.php -> login endpoint (returns token)
- api/logout.php -> logout
- api/banlist.php, api/toprich.php -> fetch data from DB
- dashboard.html -> protected UI (uses token in Authorization header)
- login.html / register.html -> frontend forms

## SQL schema (run on your MySQL server)
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(128) NOT NULL UNIQUE,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional tables you may create to link with SA-MP data:
CREATE TABLE `bans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player` varchar(64) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `banned_by` varchar(64) DEFAULT NULL,
  `banned_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `money` bigint DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

## Deployment
1. Upload all files to a PHP-capable host (Apache/Nginx + PHP7.4+).
2. Edit api/config.php with DB credentials.
3. Import the SQL schema into your database.
4. Open register.html to create accounts, then login.html to login and access dashboard.html.
