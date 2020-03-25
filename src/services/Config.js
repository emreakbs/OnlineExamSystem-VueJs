export const config = {
  "SERVICES": {

    "DEFAULT_SERVICE_URL":"http://localhost:30000/",
  },
  "MODULES": {
    "SCHOOL":{
      "GET_SCHOOL_LIST":"School/School/SchoolList/0",
      "SET_SCHOOL":"School/School/AddSchool",
      "DELETE_SCHOOL":"School/School/RemoveSchool/",
      "EDIT_SCHOOL":"School/School/EditSchool",
    }
  },
  createRequestUrl(url, id, service) {
    let _url;
    _url = service === undefined ? this.SERVICES.DEFAULT_SERVICE_URL : this.SERVICES[service];
    _url += this.MODULES[url.split('-')[0].toUpperCase()][url.split('-')[1].toUpperCase()] + (id === undefined ? '' : id);

    return _url;
  }
};
