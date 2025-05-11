package com.example.demo.dao;

import com.example.demo.model.Book;

import java.util.List;

public interface BookDao {
    List<Book> getAllBooks();
    void updateBook(Book book);
    void insertBook(Book book);
}
