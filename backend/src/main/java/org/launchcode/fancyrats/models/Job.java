package org.launchcode.fancyrats.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Job {

    @Id
    @GeneratedValue
    private int id;

    private int zipCode;

    private LocalDate startDate;

    private LocalDate endDate;

    //final?
    private LocalDate createdDate;

    private long payRate;

    private String description;

    @ManyToOne
    private Client client;

    //TODO: Replace Client with User once User class is created;

    //TODO: Add ManyToMany Pet field once Pet class is created;

    public Job(int zipCode, LocalDate startDate, LocalDate endDate, LocalDate createdDate, long payRate, String description, Client client) {
        this.zipCode = zipCode;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdDate = createdDate;
        this.payRate = payRate;
        this.description = description;
        this.client = client;
    }

    public Job() {}

    public int getId() {
        return id;
    }

    public int getZipCode() {
        return zipCode;
    }

    public void setZipCode(int zipCode) {
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

    public long getPayRate() {
        return payRate;
    }

    public void setPayRate(long payRate) {
        this.payRate = payRate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
