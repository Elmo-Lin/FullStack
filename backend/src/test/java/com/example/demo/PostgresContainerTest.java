package com.example.demo;

import org.junit.jupiter.api.Test;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
public class PostgresContainerTest {

    @SuppressWarnings("resource")
    @Container
    public static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:15.2")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @Test
    public void simpleQueryShouldWork() throws SQLException {
        String jdbcUrl = postgres.getJdbcUrl();
        String username = postgres.getUsername();
        String password = postgres.getPassword();

        try (Connection conn = DriverManager.getConnection(jdbcUrl, username, password)) {
            // 建立資料表
            try (Statement stmt = conn.createStatement()) {
                stmt.execute(
                    "CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(50));"
                );
            }

            // 插入資料
            try (Statement stmt = conn.createStatement()) {
                stmt.execute("INSERT INTO users(name) VALUES ('Elmo');");
            }

            // 查詢並驗證
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT name FROM users;")) {
                assertTrue(rs.next(), "No data returned from query");
                assertEquals("Elmo", rs.getString("name"));
            }
        }
    }
}
