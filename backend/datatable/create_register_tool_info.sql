CREATE TABLE IF NOT EXISTS register_tool_info (
  ip VARCHAR(45) PRIMARY KEY,
  tool_id VARCHAR(100),
  chamber VARCHAR(100),
  brand VARCHAR(100),
  start_time DATETIME,
  end_time DATETIME,
  status VARCHAR(100)
);
