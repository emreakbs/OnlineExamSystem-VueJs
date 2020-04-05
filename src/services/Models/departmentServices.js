export const departmentServices = {
  "GetDepartmentList": {
    "type": "get",
    "url": "DEPARTMENT-GET_DEPARTMENT_LIST",
    "model": []
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
