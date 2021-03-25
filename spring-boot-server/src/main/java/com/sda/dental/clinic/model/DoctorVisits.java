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
@Table(name = "doctor_visits")
public class DoctorVisits {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private Doctor doctor;

  @ManyToOne
  @JoinColumn(name = "patient_id")
  private Patient patient;

  @Column(name = "visit_date")
  private LocalDate visitDate;


  @Column(name = "diagnostic")
  private String diagnostic;

  public DoctorVisits() {
  }

  public DoctorVisits(long id, Doctor doctor, Patient patient, LocalDate visitDate, String diagnostic) {
    this.id = id;
    this.doctor = doctor;
    this.patient = patient;
    this.visitDate = visitDate;
    this.diagnostic = diagnostic;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Doctor getDoctor() {
    return doctor;
  }

  public void setDoctor(Doctor doctor) {
    this.doctor = doctor;
  }

  public Patient getPatient() {
    return patient;
  }

  public void setPatient(Patient patient) {
    this.patient = patient;
  }

  public LocalDate getVisitDate() {
    return visitDate;
  }

  public void setVisitDate(LocalDate visitDate) {
    this.visitDate = visitDate;
  }

  public String getDiagnostic() {
    return diagnostic;
  }

  public void setDiagnostic(String diagnostic) {
    this.diagnostic = diagnostic;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    DoctorVisits that = (DoctorVisits) o;
    return id == that.id &&
        Objects.equals(doctor, that.doctor) &&
        Objects.equals(patient, that.patient) &&
        Objects.equals(visitDate, that.visitDate) &&
        Objects.equals(diagnostic, that.diagnostic);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, doctor, patient, visitDate, diagnostic);
  }

  @Override
  public String toString() {
    return "DoctorVisits{" +
        "id=" + id +
        ", doctor=" + doctor +
        ", patient=" + patient +
        ", visitDate=" + visitDate +
        ", diagnostic='" + diagnostic + '\'' +
        '}';
  }
}
