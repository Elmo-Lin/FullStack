package com.example.demo.dao;

import com.example.demo.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

public interface BookDao {
    List<Book> getAllBooks();
    void updateBook(Book book);
    void insertBook(Book book);
    void deleteBook(Long id);
}

@Repository
class BookDaoImpl implements BookDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Map<String, String> sqlMap;

    @Override
    public List<Book> getAllBooks() {
        return jdbcTemplate.query(
            sqlMap.get("getAllBooks"),
            new BeanPropertyRowMapper<>(Book.class)
        );
    }

    @Override
    public void updateBook(Book book) {
        jdbcTemplate.update(
            sqlMap.get("updateBook"),
            book.getTitle(),
            book.getIsAvailable(),
            book.getBorrowDate(),
            book.getReturnDate(),
            book.getId()
        );
    }

    @Override
    public void insertBook(Book book) {
        jdbcTemplate.update(
            sqlMap.get("insertBook"),
            book.getTitle(),
            book.getIsAvailable(),
            book.getBorrowDate(),
            book.getReturnDate()
        );
    }

    @Override
    public void deleteBook(Long id) {
        jdbcTemplate.update(
            sqlMap.get("deleteBook"),
            id
        );
    }
}
