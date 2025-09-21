package com.example.demo.dao;

import com.example.demo.model.AlarmValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;

public interface AlarmValueDao {
    AlarmValue getLatestAlidByTag(String tag);
}

@Repository
class AlarmValueDaoImpl implements AlarmValueDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Map<String, String> sqlMap;

    @Override
    public AlarmValue getLatestAlidByTag(String tag) {
        try {
            return jdbcTemplate.queryForObject(
                sqlMap.get("getLatestAlidByTag"),
                new BeanPropertyRowMapper<>(AlarmValue.class),
                tag
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

}
