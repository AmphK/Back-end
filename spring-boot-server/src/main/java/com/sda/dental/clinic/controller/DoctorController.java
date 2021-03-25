package com.sda.dental.clinic.controller;

import com.sda.dental.clinic.model.Doctor;
import com.sda.dental.clinic.repository.DoctorRepository;
import com.sda.dental.clinic.repository.PatientRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class DoctorController {

	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;

	@Autowired
	public DoctorController(DoctorRepository doctorRepository,
							PatientRepository patientRepository) {
		this.doctorRepository = doctorRepository;
		this.patientRepository = patientRepository;
	}

	@GetMapping("/doctors")
	public ResponseEntity<List<Doctor>> getAllDoctors(@RequestParam(required = false) String name) {
		try {
			List<Doctor> doctors = new ArrayList<>();

			if (name == null)
				doctors.addAll(doctorRepository.findAll());
			else
				doctors.addAll(doctorRepository.findByNameContaining(name));

			if (doctors.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(doctors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/doctors/{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") long id) {
		Optional<Doctor> doctorData = doctorRepository.findById(id);

		return doctorData.map(patient -> new ResponseEntity<>(patient, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/doctors")
	public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) {
		try {

			Doctor _doctor = doctorRepository
					.save(doctor);
			return new ResponseEntity<>(_doctor, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/doctors/{id}")
	public ResponseEntity<Doctor> updateDoctor(@PathVariable("id") long id, @RequestBody Doctor doctor) {
		Optional<Doctor> patientData = doctorRepository.findById(id);

		if (patientData.isPresent()) {
			Doctor _doctor = patientData.get();
			_doctor.setName(doctor.getName());
			_doctor.setPhoneNumber(doctor.getPhoneNumber());
			return new ResponseEntity<>(doctorRepository.save(_doctor), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/doctors/{id}")
	@Transactional
	public ResponseEntity<HttpStatus> deleteDoctor(@PathVariable("id") long id) {
		try {
			patientRepository.deleteAllByDoctor_Id(id);
			doctorRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
