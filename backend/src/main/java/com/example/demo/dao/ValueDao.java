package com.example.demo.dao;
import com.example.demo.model.TagValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Map;

public interface ValueDao {
    TagValue getLatestValueByTag(String tag);
}

@Repository
class ValueDaoImpl implements ValueDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Map<String, String> sqlMap;

    @Override
    public TagValue getLatestValueByTag(String tag) {
        try {
            return jdbcTemplate.queryForObject(
                sqlMap.get("getLatestValueByTag"),
                new BeanPropertyRowMapper<>(TagValue.class),
                tag
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
}
