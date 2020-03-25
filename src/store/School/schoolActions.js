import axios from "@/axios.js"
import {serviceProvider} from "../../services/ServiceProvider"
import {schoolServices} from "../../services/Models/schoolServices"
import {globalEvents} from "../../globalEvents"

export default {
  //Get school list event
  getSchools: ({commit}) => {
    serviceProvider.create(schoolServices.GetSchoolList).then(res => {
      commit("setStateSchoolList", res.data)
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  //Create school event
  setSchool: ({commit, dispatch}, payload) => {
    schoolServices.SetSchool.model = payload;
    serviceProvider.create(schoolServices.SetSchool).then(res => {
      globalEvents.showAlert("", "", "Ekleme işlemi gerçekleşti");
      dispatch("getSchools");
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);

    })
  },
  // Remove school event
  removeSchool({commit, dispatch}, payload) {
    schoolServices.RemoveSchool.model.id = payload;
    serviceProvider.create(schoolServices.RemoveSchool).then(res => {
      globalEvents.showAlert("", "", "Silme işlemi gerçekleşti");
      dispatch("getSchools");
    }).catch(err => {

    })
  },
  editSchool({commit, dispatch}, payload) {
    schoolServices.EditSchool.model = payload;
    serviceProvider.create(schoolServices.EditSchool).then(res => {
      globalEvents.showAlert("", "", "Düzenleme işlemi gerçekleşti");
      dispatch("getSchools");
    }).catch(err => {

    })
  }
}
