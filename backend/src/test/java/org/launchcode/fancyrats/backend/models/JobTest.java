package org.launchcode.fancyrats.backend.models;

import org.junit.jupiter.api.Test;
import org.launchcode.fancyrats.models.Job;
import org.launchcode.fancyrats.models.data.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertNotNull;


@ActiveProfiles(value = "test")
@DataJpaTest
public class JobTest {

    @Autowired
    private JobRepository jobRepository;

    @Test
    public void createAndSaveJob() {
       Job job = new Job();
       Job saveJob = jobRepository.save(job);
       assertNotNull(saveJob.getId());
    }

}
