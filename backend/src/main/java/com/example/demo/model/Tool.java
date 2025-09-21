package com.example.demo.model;

import java.time.LocalDateTime;

public class Tool {
    private String ip;
    private String toolId;
    private String chamber;
    private String brand;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;

    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }

    public String getToolId() { return toolId; }
    public void setToolId(String toolId) { this.toolId = toolId; }

    public String getChamber() { return chamber; }
    public void setChamber(String chamber) { this.chamber = chamber; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
