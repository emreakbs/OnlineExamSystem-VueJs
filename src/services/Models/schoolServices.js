export const schoolServices = {
  //Get school list object
  "GetSchoolList": {
    "type": "get",
    "url": "SCHOOL-GET_SCHOOL_LIST",
    "model": []
  },
  //Create school object
  "SetSchool": {
    "type": "post",
    "url": "SCHOOL-SET_SCHOOL",
    "model": []
  },
  //Remove school object
  "RemoveSchool": {
    "type": "delete",
    "url": "SCHOOL-DELETE_SCHOOL",
    "deleteId": "id",
    "model": {"id": null}
  }
}
