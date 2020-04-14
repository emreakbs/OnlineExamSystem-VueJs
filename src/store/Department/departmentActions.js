import {serviceProvider} from "../../services/ServiceProvider"
import {departmentServices} from "../../services/Models/departmentServices"
import {globalEvents} from "../../globalEvents"

export default {
  getDepartments: ({commit}) => {
    serviceProvider.create(departmentServices.GetDepartmentList).then(res => {
      commit("setStateDepartmentList", res.data)
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  getDepartmentsSchoolName: ({commit},payload) => {
    departmentServices.GetDepartmentListSchoolName.model.id=payload;
    serviceProvider.create(departmentServices.GetDepartmentListSchoolName).then(res => {
      commit("setStateDepartmentListSchoolName", res.data)
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  setDepartment: ({commit, dispatch}, payload) => {
    departmentServices.SetDepartment.model = payload;
    serviceProvider.create(departmentServices.SetDepartment).then(res => {
      globalEvents.showAlert("", "", "Ekleme işlemi gerçekleşti");
      dispatch("getDepartments");
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);

    })
  },
  removeDepartment({commit, dispatch}, payload) {
    departmentServices.RemoveDepartment.model.id = payload;
    serviceProvider.create(departmentServices.RemoveDepartment).then(res => {
      globalEvents.showAlert("", "", "Silme işlemi gerçekleşti");
      dispatch("getDepartments");
    }).catch(err => {

    })
  },
  editDepartment({commit, dispatch}, payload) {
    departmentServices.EditDepartment.model = payload;
    serviceProvider.create(departmentServices.EditDepartment).then(res => {
      globalEvents.showAlert("", "", "Düzenleme işlemi gerçekleşti");
      dispatch("getDepartments");
    }).catch(err => {

    })
  }
}
