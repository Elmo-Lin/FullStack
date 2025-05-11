package com.example.demo.service;

import com.example.demo.dao.BookDao;
import com.example.demo.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

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
}
