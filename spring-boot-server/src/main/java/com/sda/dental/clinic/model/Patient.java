package com.sda.dental.clinic.model;

import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "patients")
public class Patient {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "age")
  private int age;

  @Column(name = "total_money_spent")
  private int totalMoneySpent;

  @Column(name = "registration_date")
  private LocalDate registrationDate;

  @ManyToOne
  @JoinColumn(name = "doctor_id", insertable=false, updatable=false)
  private Doctor doctor;

  @Column(name = "doctor_id")
  private long doctorId;

  public Patient() {

  }

  public Patient(long id, String name, int age, int totalMoneySpent, LocalDate registrationDate,
                 Doctor doctor, long doctorId) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.totalMoneySpent = totalMoneySpent;
    this.registrationDate = registrationDate;
    this.doctor = doctor;
    this.doctorId = doctorId;
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

  public int getAge() {
    return age;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public int getTotalMoneySpent() {
    return totalMoneySpent;
  }

  public void setTotalMoneySpent(int totalMoneySpent) {
    this.totalMoneySpent = totalMoneySpent;
  }

  public LocalDate getRegistrationDate() {
    return registrationDate;
  }

  public void setRegistrationDate(LocalDate registrationDate) {
    this.registrationDate = registrationDate;
  }

  public Doctor getDoctor() {
    return doctor;
  }

  public void setDoctor(Doctor doctor) {
    this.doctor = doctor;
  }

  public long getDoctorId() {
    return doctorId;
  }

  public void setDoctorId(long doctorId) {
    this.doctorId = doctorId;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Patient patient = (Patient) o;
    return id == patient.id &&
        age == patient.age &&
        totalMoneySpent == patient.totalMoneySpent &&
        doctorId == patient.doctorId &&
        Objects.equals(name, patient.name) &&
        Objects.equals(registrationDate, patient.registrationDate) &&
        Objects.equals(doctor, patient.doctor);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, age, totalMoneySpent, registrationDate, doctor, doctorId);
  }

  @Override
  public String toString() {
    return "Patient{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", age=" + age +
        ", totalMoneySpent=" + totalMoneySpent +
        ", registrationDate=" + registrationDate +
        ", doctor=" + doctor +
        ", doctorId=" + doctorId +
        '}';
  }
}
