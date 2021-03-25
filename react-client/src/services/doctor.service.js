import http from "../http-common";

class DoctorDataService {
  getAll() {
    return http.get("/doctors");
  }

  get(id) {
    return http.get(`/doctors/${id}`);
  }

  create(data) {
    return http.post("/doctors", data);
  }

  update(id, data) {
    return http.put(`/doctors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/doctors/${id}`);
  }


  findByName(name) {
    return http.get(`/doctors?name=${name}`);
  }
}

export default new DoctorDataService();
