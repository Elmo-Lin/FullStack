package com.example.demo.controller;

import com.example.demo.model.AlarmValue;
import com.example.demo.service.AlarmValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/alarms")
public class AlarmValueController {

    @Autowired
    private AlarmValueService alarmValueService;

    /** 單筆：GET /alarms?tag=too1/CH_1/SomeALID */
    @GetMapping
    public ResponseEntity<AlarmValue> getLatest(@RequestParam String tag) {
        AlarmValue av = alarmValueService.getLatestAlidByTag(tag);
        return (av == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(av);
    }
}
