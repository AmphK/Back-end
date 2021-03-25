package com.sda.dental.clinic.controller;

import com.sda.dental.clinic.model.Patient;
import com.sda.dental.clinic.repository.PatientRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
public class PatientController {

	private final PatientRepository patientRepository;

	@Autowired
	public PatientController(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}

	@GetMapping("/patients")
	public ResponseEntity<List<Patient>> getAllPatients(@RequestParam(required = false) String name,
														@RequestParam(required = true) long doctorId) {
		try {
			List<Patient> patients = new ArrayList<>();

			if (name == null)
				patients.addAll(patientRepository.findByDoctorId(doctorId));
			else
				patients.addAll(patientRepository.findByNameContainingAndDoctor_Id(name, doctorId));

			if (patients.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(patients, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/patients/{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable("id") long id) {
		Optional<Patient> patientData = patientRepository.findById(id);

		return patientData.map(patient -> new ResponseEntity<>(patient, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/patients")
	public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
		try {
			patient.setRegistrationDate(LocalDate.now());
			patient.setTotalMoneySpent(0);
			Patient _patient = patientRepository
					.save(patient);
			return new ResponseEntity<>(_patient, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}

	@PutMapping("/patients/{id}")
	public ResponseEntity<Patient> updatePatient(@PathVariable("id") long id, @RequestBody Patient patient) {
		Optional<Patient> patientData = patientRepository.findById(id);

		if (patientData.isPresent()) {
			Patient _patient = patientData.get();
			_patient.setName(patient.getName());
			_patient.setAge(patient.getAge());
			_patient.setTotalMoneySpent(patient.getTotalMoneySpent());
			return new ResponseEntity<>(patientRepository.save(_patient), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/patients/{id}")
	public ResponseEntity<HttpStatus> deletePatient(@PathVariable("id") long id) {
		try {
			patientRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
