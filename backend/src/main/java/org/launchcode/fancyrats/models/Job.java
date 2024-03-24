package org.launchcode.fancyrats.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Job {

    //Fields
    @Id
    @GeneratedValue
    private Integer id;

    private String username;
    private String animal;


    //Constructors
    public Job(){};
    public Job(String username, String animal){
        this.username = username;
        this.animal = animal;
    }


    //Getters and Setters
    public Integer getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getAnimal() {
        return animal;
    }
    public void setAnimal(String animal) {
        this.animal = animal;
    }
}
