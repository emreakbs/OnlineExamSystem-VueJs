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
    },
    "BRANCH":{
      "GET_BRANCH_LIST":"Branch/Branch/BranchList/",
      "SET_BRANCH":"Branch/Branch/AddBranch",
      "DELETE_BRANCH":"Branch/Branch/RemoveBranch/",
      "EDIT_BRANCH":"Branch/Branch/EditBranch",
    },
    "DEPARTMENT":{
      "GET_DEPARTMENT_LIST":"Department/Department/DepartmentList",
      "GET_DEPARTMENT_LIST_SCHOOL_NAME":"Department/Department/DepartmentList/",
      "SET_DEPARTMENT":"Department/Department/AddDepartment",
      "DELETE_DEPARTMENT":"Department/Department/RemoveDepartment/",
      "EDIT_DEPARTMENT":"Department/Department/EditDepartment",
    },
    "TEACHER":{
      "GET_TEACHER_LIST":"Teacher/Teacher/TeacherList",
      "SET_TEACHER":"Teacher/Teacher/AddTeacher",
      "DELETE_TEACHER":"Teacher/Teacher/RemoveTeacher/",
      "EDIT_TEACHER":"Teacher/Teacher/EditTeacher",
    },
    "USER":{
      "LOGIN":"User/User/SignIn",
      "LOGOUT":"User/User/SignOut",
    },
  },
  createRequestUrl(url, id, service) {
    let _url;
    _url = service === undefined ? this.SERVICES.DEFAULT_SERVICE_URL : this.SERVICES[service];
    _url += this.MODULES[url.split('-')[0].toUpperCase()][url.split('-')[1].toUpperCase()] + (id === undefined ? '' : id);

    return _url;
  }
};
