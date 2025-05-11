package com.example.demo.controller;

import com.example.demo.model.Book;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // Jackson，用於 JSON 序列化

    @Test
    public void testGetAllBooks() throws Exception {
        mockMvc.perform(get("/books"))
               .andExpect(status().isOk());
               // 你也可以加上 JSON 結構驗證
    }

    @Test
    public void testInsertBook() throws Exception {
        Book book = new Book();
        book.setTitle("Test Book");
        book.setIsAvailable(true);
        book.setBorrowDate(LocalDate.of(2025, 5, 2));
        book.setReturnDate(LocalDate.of(2025, 5, 15));

        String json = objectMapper.writeValueAsString(book);

        mockMvc.perform(post("/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
    }
}
