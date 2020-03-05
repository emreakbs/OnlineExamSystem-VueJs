import Vue from 'vue';
import axios from "axios";
import { config } from "./Config";
import { globalEvents } from "../globalEvents"
export const serviceProvider = new Vue({
  methods: {
    create(object) {
      let that = this;
      globalEvents.openLoading();
      switch (object.type) {
        case "post": {
          let deferred = new Promise(function (resolve, reject) {
            axios.post(
              config.createRequestUrl(object.url),
              object.model)
              .then(response => {
                globalEvents.closeLoading();
                resolve(response);
              })
              .catch(error => {
                globalEvents.closeLoading();
                reject(error);
              })
          });
          return deferred;
        }
        case "get": {
          let deferred = new Promise(function (resolve, reject) {
            axios.get(config.createRequestUrl(object.url, object.model[object.getId]))
              .then(response => {
                globalEvents.closeLoading();
                resolve(response);
              })
              .catch(error => {
                globalEvents.closeLoading();
                reject(error);
              });
          });
          return deferred;
        }
        case "put": {
          let deferred = new Promise(function (resolve, reject) {
            axios.put(config.createRequestUrl(object.url),
              object.model)
              .then(response => {
                globalEvents.closeLoading();
                resolve(response);
              })
              .catch(error => {
                globalEvents.closeLoading();
                reject(error);
              });
          });
          return deferred;
        }
        case "delete": {
          let deferred = new Promise(function (resolve, reject) {
            axios.delete(config.createRequestUrl(object.url, object.model[object.deleteId]))
              .then(response => {
                globalEvents.closeLoading();
                resolve(response);
              })
              .catch(error => {
                globalEvents.closeLoading();
                reject(error);
              });
          });
          return deferred;
        }
      }
    },
    uploadFile(object) {
      let deferred = new Promise(function (resolve, reject) {
        axios.post(config.createRequestUrl(object.url, object.id),
          object.file,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem('uMdl')).uMdl.token}`
            }
          })
          .then(response => {
            globalEvents.closeLoading();
            resolve(response);
          })
          .catch(error => {
            globalEvents.closeLoading();
            reject(error);
          })
      });
      return deferred;
    },
    getToken() {
      if (localStorage.getItem('uMdl')) {
        return { "Authorization": `Bearer ${JSON.parse(localStorage.getItem('uMdl')).uMdl.token}` };
      }
      return "";
    }
  }
});
