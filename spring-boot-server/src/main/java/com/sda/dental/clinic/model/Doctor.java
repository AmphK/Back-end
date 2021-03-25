package com.sda.dental.clinic.model;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "doctors")
public class Doctor {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "nationality")
  private String nationality;

  @Column(name = "specialization")
  private String specialization;

  public Doctor() {
  }

  public Doctor(long id, String name, String phoneNumber, String nationality, String specialization) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.nationality = nationality;
    this.specialization = specialization;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getNationality() {
    return nationality;
  }

  public void setNationality(String nationality) {
    this.nationality = nationality;
  }

  public String getSpecialization() {
    return specialization;
  }

  public void setSpecialization(String specialization) {
    this.specialization = specialization;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Doctor doctor = (Doctor) o;
    return id == doctor.id &&
        Objects.equals(name, doctor.name) &&
        Objects.equals(phoneNumber, doctor.phoneNumber) &&
        Objects.equals(nationality, doctor.nationality) &&
        Objects.equals(specialization, doctor.specialization);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, phoneNumber, nationality, specialization);
  }

  @Override
  public String toString() {
    return "Doctor{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", phoneNumber='" + phoneNumber + '\'' +
        ", nationality='" + nationality + '\'' +
        ", specialization='" + specialization + '\'' +
        '}';
  }
}
