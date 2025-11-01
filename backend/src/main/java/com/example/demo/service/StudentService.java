package com.example.demo.service;

import com.example.demo.dao.StudentDao;
import com.example.demo.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudentById(String id);
    void insertStudent(Student student);
    void updateStudent(String id, Student student);
    void deleteStudent(String id);
    List<Student> searchByName(String namePart);
}

@Service
class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentDao studentDao;

    @Override
    public List<Student> getAllStudents() {
        return studentDao.getAllStudents();
    }

    @Override
    public Student getStudentById(String id) {
        return studentDao.getStudentById(id);
    }

    @Override
    public void insertStudent(Student student) {
        studentDao.insertStudent(student);
    }

    @Override
    public void updateStudent(String id, Student student) {
        student.setId(id);
        studentDao.updateStudent(student);
    }

    @Override
    public void deleteStudent(String id) {
        studentDao.deleteStudent(id);
    }

    @Override
    public List<Student> searchByName(String namePart) {
        return studentDao.searchByName(namePart);
    }
}
