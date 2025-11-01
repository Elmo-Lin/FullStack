package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    @GetMapping
    public List<Student> getAll() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getOne(@PathVariable String id) {
        return service.getStudentById(id);
    }

    @PostMapping
    public void insert(@Valid @RequestBody Student student) {
        service.insertStudent(student);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable String id, @Valid @RequestBody Student student) {
        service.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteStudent(id);
    }

    @GetMapping("/search")
    public List<Student> search(@RequestParam String name) {
        return service.searchByName(name);
    }
}
