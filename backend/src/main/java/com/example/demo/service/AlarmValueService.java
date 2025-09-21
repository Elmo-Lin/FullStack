package com.example.demo.service;

import com.example.demo.dao.AlarmValueDao;
import com.example.demo.model.AlarmValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface AlarmValueService {
    AlarmValue getLatestAlidByTag(String tag);
}

@Service
class AlarmValueServiceImpl implements AlarmValueService {

    @Autowired
    private AlarmValueDao alarmValueDao;

    @Override
    public AlarmValue getLatestAlidByTag(String tag) {
        return alarmValueDao.getLatestAlidByTag(tag);
    }

}
