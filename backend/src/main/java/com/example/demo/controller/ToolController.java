package com.example.demo.controller;

import com.example.demo.model.Tool;
import com.example.demo.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tools")
public class ToolController {

    @Autowired
    private ToolService toolService;

    @GetMapping
    public List<Tool> getAllTools() {
        return toolService.getAllTools();
    }

    @GetMapping("/{brand}")
    public List<Tool> getToolsByBrand(@PathVariable String brand) {
        return toolService.getToolsByBrand(brand);
    }

    @GetMapping("/toolId/{toolId}")
    public ResponseEntity<?> getChamberByToolId(@PathVariable String toolId) {
        String chamber = toolService.getChamberByToolId(toolId);
        if (chamber == null || chamber.isBlank()) {
            return ResponseEntity.notFound().build();
        }

        List<String> chambers = Arrays.stream(chamber.split(":"))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .distinct()
                .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of(
                "toolId", toolId,
                "chambers", chambers
        ));
    }

}
