package org.launchcode.fancyrats.controllers;

import jakarta.validation.Valid;
import org.launchcode.fancyrats.models.Job;
import org.launchcode.fancyrats.models.data.JobRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobsController {

    private final JobRepository jobRepository;

    public JobsController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<Job> getJobs() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public Job getJob(@PathVariable Integer id) {
        return jobRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) throws URISyntaxException {
        //TODO: Validate job object before save
        job.setCreatedDate(LocalDate.now());
        Job savedJob = jobRepository.save(job);
        return ResponseEntity.created(new URI("/jobs/" + savedJob.getId())).body(savedJob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Integer id, @Valid @RequestBody Job job) {
        Job currentJob = jobRepository.findById(id).orElseThrow(RuntimeException::new);
        currentJob.setDescription(job.getDescription());
        currentJob.setZipCode(job.getZipCode());
        currentJob.setPayRate(job.getPayRate());
        currentJob.setStartDate(job.getStartDate());
        currentJob.setEndDate(job.getEndDate());
        currentJob = jobRepository.save(currentJob);
        //TODO: Validate currentJob object
        return ResponseEntity.ok(currentJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Job> deleteJob(@PathVariable Integer id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
