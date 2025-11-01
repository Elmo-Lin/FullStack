package com.example.demo.dao;

import com.example.demo.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface StudentDao {
    List<Student> getAllStudents();
    Student getStudentById(String id);
    void insertStudent(Student s);
    void updateStudent(Student s);
    void deleteStudent(String id);
    List<Student> searchByName(String namePart);
}

@Repository
class StudentDaoImpl implements StudentDao {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Student> getAllStudents() {
        return mongoTemplate.findAll(Student.class);
    }

    @Override
    public Student getStudentById(String id) {
        return mongoTemplate.findById(id, Student.class);
    }

    @Override
    public void insertStudent(Student student) {
        mongoTemplate.insert(student);
    }

    @Override
    public void updateStudent(Student student) {
        Query q = new Query(Criteria.where("_id").is(student.getId()));
        Update u = new Update()
                .set("name", student.getName())
                .set("age", student.getAge())
                .set("email", student.getEmail());
        mongoTemplate.updateFirst(q, u, Student.class);
    }

    @Override
    public void deleteStudent(String id) {
        Query q = new Query(Criteria.where("_id").is(id));
        mongoTemplate.remove(q, Student.class);
    }

    @Override
    public List<Student> searchByName(String namePart) {
        Query q = new Query(Criteria.where("name").regex(namePart, "i"));
        return mongoTemplate.find(q, Student.class);
    }
}
