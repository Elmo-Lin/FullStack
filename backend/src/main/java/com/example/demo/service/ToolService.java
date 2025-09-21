package com.example.demo.service;

import com.example.demo.dao.ToolDao;
import com.example.demo.model.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ToolService {
    List<Tool> getAllTools();
    List<Tool> getToolsByBrand(String brand);
    String getChamberByToolId(String toolId);
}

@Service
class ToolServiceImpl implements ToolService {

    @Autowired
    private ToolDao toolDao;

    @Override
    public List<Tool> getAllTools() {
        return toolDao.getAllTools();
    }

    @Override
    public List<Tool> getToolsByBrand(String brand) {
        return toolDao.getToolsByBrand(brand);
    }

    @Override
    public String getChamberByToolId(String toolId) {
        return toolDao.getChamberByToolId(toolId);
    }

}
