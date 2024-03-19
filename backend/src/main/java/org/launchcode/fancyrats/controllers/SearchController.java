package org.launchcode.fancyrats.controllers;

import org.launchcode.fancyrats.models.Job;
import org.launchcode.fancyrats.models.data.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getJobList(@RequestParam(required = false) Integer id){
        List<Job> returnedJobList = new ArrayList<>();

        if (id == null){return jobRepository.findAll();}
        else{
            Optional<Job> optionalJob= jobRepository.findById(id);
            if (optionalJob.isPresent()){
                returnedJobList.add(optionalJob.get());
            } else return jobRepository.findAll();
        }
        return returnedJobList;
    }

}