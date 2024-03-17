package org.launchcode.fancyrats.controllers;

import org.launchcode.fancyrats.models.Job;
import org.launchcode.fancyrats.models.data.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchController {

    @Autowired
    private JobRepository jobRepository;

    @RequestMapping("/search")
    public List<Job> getJobList(){
        return jobRepository.findAll();
    }
}