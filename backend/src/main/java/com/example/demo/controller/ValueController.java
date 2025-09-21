package com.example.demo.controller;

import com.example.demo.model.TagValue;
import com.example.demo.service.ValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/values")
public class ValueController {

    @Autowired
    private ValueService valueService;

    @GetMapping
    public ResponseEntity<TagValue> getLatest(@RequestParam String tag) {
        TagValue tv = valueService.getLatestValueByTag(tag);
        return (tv == null)
                ? ResponseEntity.notFound().build()
                : ResponseEntity.ok(tv);
    }
}
