package com.example.demo.service;

import com.example.demo.dao.ValueDao;
import com.example.demo.model.TagValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

public interface ValueService {
    TagValue getLatestValueByTag(String tag);
}

@Service
class ValueServiceImpl implements ValueService {

    @Autowired
    private ValueDao valueDao;

    @Override
    public TagValue getLatestValueByTag(String tag) {
        return valueDao.getLatestValueByTag(tag);
    }
}