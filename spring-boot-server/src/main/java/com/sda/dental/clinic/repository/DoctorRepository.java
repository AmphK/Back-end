package com.sda.dental.clinic.repository;

import com.sda.dental.clinic.model.Doctor;
import com.sda.dental.clinic.model.Patient;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
  List<Doctor> findByNameContaining(String name);

}
