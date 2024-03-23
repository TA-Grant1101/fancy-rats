package org.launchcode.fancyrats.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
public class Job {

    @Id
    @GeneratedValue
    private Integer id;

    @NotNull(message = "Zip code required")
    private Integer zipCode;

    @NotNull(message = "Start date required")
    @FutureOrPresent(message = "Format YYYY-MM-DD")
    private LocalDate startDate;

    @NotNull(message = "End date required")
    @FutureOrPresent(message = "Format YYYY-MM-DD")
    private LocalDate endDate;

    private LocalDate createdDate;

    private double payRate;

    private double totalHours;

    private String description;

    @ManyToOne
    private User user;

    //TODO: Add ManyToMany Pet field once Pet class is created;

    //TODO: Reorder fields to match form response body

    public Job(Integer zipCode, LocalDate startDate, LocalDate endDate, LocalDate createdDate, double payRate, double totalHours, String description, User user) {
        this.zipCode = zipCode;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdDate = createdDate;
        this.payRate = payRate;
        this.totalHours = totalHours;
        this.description = description;
        this.user = user;
    }

    public Job() {}

    public Integer getId() {
        return id;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public double getPayRate() {
        return payRate;
    }

    public void setPayRate(double payRate) {
        this.payRate = payRate;
    }

    public double getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(double totalHours) {
        this.totalHours = totalHours;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
