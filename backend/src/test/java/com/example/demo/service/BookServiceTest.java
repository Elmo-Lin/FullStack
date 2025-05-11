package com.example.demo.service;

import com.example.demo.dao.BookDao;
import com.example.demo.model.Book;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookServiceTest {

    @Mock
    private BookDao bookDao;

    @InjectMocks
    private BookServiceImpl bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBooks() {
        when(bookDao.getAllBooks()).thenReturn(List.of(new Book()));
        assertEquals(1, bookService.getAllBooks().size());
    }

    @Test
    void testInsertBook() {
        Book book = new Book();
        book.setTitle("Test Insert");
        book.setIsAvailable(true);
        book.setBorrowDate(LocalDate.now());
        book.setReturnDate(LocalDate.now().plusDays(3));

        bookService.insertBook(book);
        verify(bookDao, times(1)).insertBook(book);
    }
}
