package com.example.demo.dao;

import com.example.demo.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;
import java.util.Map;

public interface ToolDao {
    List<Tool> getAllTools();
    List<Tool> getToolsByBrand(String brand);
    String getChamberByToolId(String toolId);
}

@Repository
class ToolDaoImpl implements ToolDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private Map<String, String> sqlMap;

    @Override
    public List<Tool> getAllTools() {
        return jdbcTemplate.query(
            sqlMap.get("getAllTools"),
            new BeanPropertyRowMapper<>(Tool.class)
        );
    }

    @Override
    public List<Tool> getToolsByBrand(String brand) {
        return jdbcTemplate.query(
            sqlMap.get("getToolsByBrand"),
            new BeanPropertyRowMapper<>(Tool.class),
            brand
        );
    }

    @Override
    public String getChamberByToolId(String toolId) {
        try {
            return jdbcTemplate.queryForObject(
                sqlMap.get("getChamberByToolId"),
                String.class,
                toolId
            );
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }
    
}
