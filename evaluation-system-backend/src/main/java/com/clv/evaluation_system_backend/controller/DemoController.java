package com.clv.evaluation_system_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello from Swagger Demo!";
    }

    @PostMapping("/sum")
    public int calculateSum(@RequestParam int a, @RequestParam int b) {
        return a + b;
    }
}
