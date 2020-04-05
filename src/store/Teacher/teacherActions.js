import axios from "@/axios.js"
import {serviceProvider} from "../../services/ServiceProvider"
import {globalEvents} from "../../globalEvents"
import {teacherServices} from '../../services/Models/teacherServices'

export default {
  getTeachers: ({commit},payload) => {
    serviceProvider.create(teacherServices.GetTeacherList).then(res => {
      commit("setStateTeacherList", res.data)
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  setTeacher: ({commit, dispatch}, payload) => {
    teacherServices.SetTeacher.model = payload;
    serviceProvider.create(teacherServices.SetTeacher).then(res => {
      globalEvents.showAlert("", "", "Ekleme işlemi gerçekleşti");
      dispatch("getTeachers");
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);

    })
  },
  removeTeacher({commit, dispatch}, payload) {
    teacherServices.RemoveTeacher.model.id = payload;
    serviceProvider.create(teacherServices.RemoveTeacher).then(res => {
      globalEvents.showAlert("", "", "Silme işlemi gerçekleşti");
      dispatch("getTeachers");
    }).catch(err => {

    })
  },
  editTeacher({commit, dispatch}, payload) {
    teacherServices.EditTeacher.model = payload;
    serviceProvider.create(teacherServices.EditTeacher).then(res => {
      globalEvents.showAlert("", "", "Düzenleme işlemi gerçekleşti");
      dispatch("getTeachers");
    }).catch(err => {

    })
  }
}
