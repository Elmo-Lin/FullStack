CREATE TABLE IF NOT EXISTS book (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  is_available BOOLEAN,       -- 在 MariaDB 中是 TINYINT(1) 的別名
  borrow_date DATE,
  return_date DATE
);
