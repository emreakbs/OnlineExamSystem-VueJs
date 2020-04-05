export const branchServices = {
  //Get branch list object
  "GetBranchList": {
    "type": "get",
    "url": "BRANCH-GET_BRANCH_LIST",
    "getId":"id",
    "model": {"id":null}
  },
  //Create branch object
  "SetBranch": {
    "type": "post",
    "url": "BRANCH-SET_BRANCH",
    "model": {}
  },
  //Remove branch object
  "RemoveBranch": {
    "type": "delete",
    "url": "BRANCH-DELETE_BRANCH",
    "deleteId": "id",
    "model": {"id": null}
  },
  "EditBranch": {
    "type": "put",
    "url": "BRANCH-EDIT_BRANCH",
    "model": {}
  }
}
