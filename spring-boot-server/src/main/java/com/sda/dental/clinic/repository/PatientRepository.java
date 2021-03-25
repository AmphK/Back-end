package com.sda.dental.clinic.repository;

import com.sda.dental.clinic.model.Patient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
  List<Patient> findByNameContainingAndDoctor_Id(String name, long doctorId);

  List<Patient> findByDoctorId(long doctorId);

  void deleteAllByDoctor_Id(long doctorId);
}
