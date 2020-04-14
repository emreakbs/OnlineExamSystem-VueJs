export const departmentServices = {
  "GetDepartmentList": {
    "type": "get",
    "url": "DEPARTMENT-GET_DEPARTMENT_LIST",
    "model": []
  },
  "GetDepartmentListSchoolName": {
    "type": "get",
    "url": "DEPARTMENT-GET_DEPARTMENT_LIST_SCHOOL_NAME",
    "getId": "id",
    "model": {"id": "getId"}
  },
  "SetDepartment": {
    "type": "post",
    "url": "DEPARTMENT-SET_DEPARTMENT",
    "model": {}
  },
  "RemoveDepartment": {
    "type": "delete",
    "url": "DEPARTMENT-DELETE_DEPARTMENT",
    "deleteId": "id",
    "model": {"id": null}
  },
  "EditDepartment": {
    "type": "put",
    "url": "DEPARTMENT-EDIT_DEPARTMENT",
    "model": {}
  }
}
