export const teacherServices = {
  "GetTeacherList": {
    "type": "get",
    "url": "TEACHER-GET_TEACHER_LIST",
    "model": []
  },
  "SetTeacher": {
    "type": "post",
    "url": "TEACHER-SET_TEACHER",
    "model": {}
  },
  "RemoveTeacher": {
    "type": "delete",
    "url": "TEACHER-DELETE_TEACHER",
    "deleteId": "id",
    "model": {"id": null}
  },
  "EditTeacher": {
    "type": "put",
    "url": "TEACHER-EDIT_TEACHER",
    "model": {}
  }
}
