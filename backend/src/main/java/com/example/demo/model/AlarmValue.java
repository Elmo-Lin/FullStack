package com.example.demo.model;

import java.time.LocalDateTime;

public class AlarmValue {
    private String tag;
    private Boolean value;
    private LocalDateTime timestamp;

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public Boolean getValue() { return value; }
    public void setValue(Boolean value) { this.value = value; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
