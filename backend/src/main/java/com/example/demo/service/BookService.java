package com.example.demo.service;

import com.example.demo.model.Book;
import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    void updateBook(Long id, Book book);
    void insertBook(Book book);
    void deleteBook(Long id);
}
