import Vue from "vue";

export const globalEvents = new Vue({
  methods: {
    showAlert(color, title, text) {
      this.$vs.notify({
        color: color ? color : "success",
        title: title ? title : "Başarılı",
        text: text ? text : ""
      })
    }
  }
});
