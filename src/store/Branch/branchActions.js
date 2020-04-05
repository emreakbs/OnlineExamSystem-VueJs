import axios from "@/axios.js"
import {serviceProvider} from "../../services/ServiceProvider"
import {schoolServices} from "../../services/Models/schoolServices"
import {globalEvents} from "../../globalEvents"
import { branchServices } from "../../services/Models/branchServices"

export default {
  //Get branch list event
  getBranches: ({commit},payload) => {
    branchServices.GetBranchList.model.id=payload;
    serviceProvider.create(branchServices.GetBranchList).then(res => {
      commit("setStateBranchList", res.data)
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  //Create branch event
  setBranch: ({commit, dispatch}, payload) => {
    branchServices.SetBranch.model = payload;
    serviceProvider.create(branchServices.SetBranch).then(res => {
      globalEvents.showAlert("", "", "Ekleme işlemi gerçekleşti");
      dispatch("getBranches");
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);

    })
  },
  // Remove branch event
  removeBranch({commit, dispatch}, payload) {
    branchServices.RemoveBranch.model.id = payload;
    serviceProvider.create(branchServices.RemoveBranch).then(res => {
      globalEvents.showAlert("", "", "Silme işlemi gerçekleşti");
      dispatch("getBranches");
    }).catch(err => {

    })
  },
  editBranch({commit, dispatch}, payload) {
    branchServices.EditBranch.model = payload;
    serviceProvider.create(branchServices.EditBranch).then(res => {
      globalEvents.showAlert("", "", "Düzenleme işlemi gerçekleşti");
      dispatch("getBranches");
    }).catch(err => {

    })
  }
}
