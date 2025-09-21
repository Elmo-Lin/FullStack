package com.example.demo.service;

import com.example.demo.dao.BookDao;
import com.example.demo.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {
    List<Book> getAllBooks();
    void updateBook(Long id, Book book);
    void insertBook(Book book);
    void deleteBook(Long id);
}

@Service
class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> getAllBooks() {
        return bookDao.getAllBooks();
    }

    @Override
    public void updateBook(Long id, Book book) {
        book.setId(id);
        bookDao.updateBook(book);
    }
    
    @Override
    public void insertBook(Book book) {
        bookDao.insertBook(book);
    }

    @Override
    public void deleteBook(Long id) {
        bookDao.deleteBook(id);
    }
}
