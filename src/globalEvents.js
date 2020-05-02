import Vue from "vue";

export const globalEvents = new Vue({
  methods: {
    // return alert.
    showAlert(color, title, text) {
      this.$vs.notify({
        color: color ? color : "success",
        title: title ? title : "Başarılı",
        text: text ? text : ""
      })
    },
    // colorize the active passivity condition.
    getStatusColor(status) {
      if (status == false) return "danger";
      if (status == true) return "success";
      return "primary";
    },
    openLoading() {
      let loadMessage = [
        "Bir gün değil, her gün istersen olur.",
        "Büyük işler sanki hiç ölmeyecekmiş gibi çalışmakla başarılabilir.",
        "Hiçbir şeyi yargılama, mutlu olacaksın.",
        "Her şeyi affet, daha mutlu olacaksın.",
        "Her şeyi sev, en mutlu sen olacaksın.",
        "İmkansız olana, imkan tanıyın.",
        "Kendini sev.."
      ]
      let index = Math.floor(Math.random() * loadMessage.length);

      this.$vs.loading({
        type: "radius",
        text: loadMessage[index]
      })
    },
    closeLoading() {
      this.$vs.loading.close();
    },
    authControl() {
      let authUser = this.getAuthUser();
      let nowDate = new Date().getTime();
      if (authUser == null ){
        localStorage.setItem(btoa("authUser"),JSON.stringify({userLevel:5}))
        location.href = "/";
      } 
      else if ((nowDate - authUser.loginDate) > 1000 * 60 * 60 * 24 * 2) {
        location.href = "/"
      }
    },
    getAuthUser() {
      return JSON.parse(localStorage.getItem(btoa("authUser")));
    },
    userLevelControl(){
      let authUser=this.getAuthUser();
      
    }
  }
});
