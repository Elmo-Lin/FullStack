package com.example.demo.model;

import java.time.LocalDateTime;

public class TagValue {
    private String tag;
    private Double value;
    private LocalDateTime timestamp;

    // getter & setter
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
