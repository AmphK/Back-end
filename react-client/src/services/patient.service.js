import http from "../http-common";

class PatientDataService {
  getAll(doctorId) {
    return http.get(`/patients?doctorId=${doctorId}`);
  }

  get(id) {
    return http.get(`/patients/${id}`);
  }

  create(data) {
    return http.post("/patients", data);
  }

  update(id, data) {
    return http.put(`/patients/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patients/${id}`);
  }


  findByName(name, doctorId) {
    return http.get(`/patients?name=${name}&doctorId=${doctorId}`);
  }
}

export default new PatientDataService();
