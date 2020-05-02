import axios from "@/axios.js"
import { serviceProvider } from "../../services/ServiceProvider"
import { globalEvents } from "../../globalEvents"
import { userServices } from "../../services/Models/userServices"

export default {
  logout: ({ commit }) => {
    serviceProvider.create(userServices.Logout).then(res => {
      this.$router.push('/').catch(() => { })
    }).catch(err => {
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);
    })
  },
  login: ({ commit, dispatch }, payload) => {
    userServices.Login.model = payload;
    serviceProvider.create(userServices.Login).then(res => {
      res.data.loginDate = Date.now();
      commit("setAuthUser", res.data);
      location.href = '/home';
    }).catch(err => {
      debugger
      let message = err.response.data ? err.response.data : "";
      globalEvents.showAlert("danger", "Hata !!", message);

    })
  }
}
