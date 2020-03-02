<template>
  <div id="data-list-list-view" class="data-list-container">
    <!--TEACHER ADD OR EDIT SIDEBAR-->
    <teacher-add-or-edit-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar"
                                 :data="sidebarData"/>

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" noDataText="Veri bulunamadı"
              search :data="data">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ADD NEW TEACHER-->
          <vx-tooltip text="Öğretmen Ekle">
            <div
              class="p-4 border border-solid mb-4 d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-small"
              @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
            </div>
          </vx-tooltip>
        </div>

        <!-- ITEMS PER PAGE -->
        <vx-tooltip text="Satır sayısı">
          <vs-dropdown vs-trigger-click class=" cursor-pointer mb-4 mr-4 items-center items-per-page-handler">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-small">
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage=5">
                <span>5</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=15">
                <span>15</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=20">
                <span>20</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </vx-tooltip>
      </div>

      <!-- TABLE HEAD -->
      <template slot="thead">
        <vs-th sort-key="teacherFirstName">ADI SOYADI</vs-th>
        <vs-th sort-key="teacherMail">MAİL</vs-th>
        <vs-th sort-key="teacherNickName">KULLANICI ADI</vs-th>
        <vs-th sort-key="teacherStatus">AKTİFLİK DURUMU</vs-th>
        <vs-th sort-key="teacherBranch">BRANŞ</vs-th>
        <vs-th sort-key="teacherPosition">YETKİ</vs-th>
        <vs-th sort-key="departmentId"> DEPARTMAN</vs-th>
        <vs-th>Düzenle / Sil</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherFirstName+' '+tr.teacherMediumName+' '+
              tr.teacherLastName}}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherMail }}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherNickname }}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherStatus }}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherBranch }}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.teacherPosition }}</p>
          </vs-td>
          <vs-td>
            <p class="font-medium truncate">{{ tr.departmentId }}</p>
          </vs-td>

          <!--EDIT OR DELETE COLUMN-->
          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary"
                          @click.stop="editData(tr)"/>
            <feather-icon icon="TrashIcon" tooltip="sil" svgClasses="w-5 h-5 hover:text-danger"
                          class="ml-2" @click.stop="openDeleteSchoolDialog"/>
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
  import TeacherAddOrEditSidebar from "./Teacher/TeacherAddOrEditSidebar";
  import {globalEvents} from "../globalEvents";

  export default {
    name: "Teacher",
    components: {
      TeacherAddOrEditSidebar
    },
    data() {
      return {
        activeConfirm: false,
        data: [{
          teacherId: 1,
          teacherFirstName: "Amre",
          teacherMediumName: "",
          teacherLastName: "AKBAŞ",
          teacherMail: "eakbas@gmail.com",
          teacherNickname: "eakbas",
          teacherPassword: "123456",
          teacherStatus: "true",
          teacherPasswordRetry: "",
          teacherBranch: 1,
          teacherPosition: 1,
          departmentId: 1
        }, {
          teacherId: 1,
          teacherFirstName: "Emre",
          teacherMediumName: "",
          teacherLastName: "AKBAŞ",
          teacherMail: "eakbas@gmail.com",
          teacherNickname: "eakbas",
          teacherPassword: "123456",
          teacherStatus: "true",
          teacherPasswordRetry: "",
          teacherBranch: 1,
          teacherPosition: 1,
          departmentId: 1
        }, {
          teacherId: 1,
          teacherFirstName: "Emre",
          teacherMediumName: "",
          teacherLastName: "AKBAŞ",
          teacherMail: "eakbas@gmail.com",
          teacherNickname: "eakbas",
          teacherPassword: "123456",
          teacherStatus: "true",
          teacherPasswordRetry: "",
          teacherBranch: 1,
          teacherPosition: 1,
          departmentId: 1
        }, {
          teacherId: 1,
          teacherFirstName: "Emre",
          teacherMediumName: "Fatih",
          teacherLastName: "AKBAŞ",
          teacherMail: "eakbas@gmail.com",
          teacherNickname: "eakbas",
          teacherPassword: "123456",
          teacherStatus: "true",
          teacherPasswordRetry: "",
          teacherBranch: 1,
          teacherPosition: 1,
          departmentId: 1
        },],
        selected: [],
        itemsPerPage: 5,
        isMounted: false,

        // Data Sidebar
        addNewDataSidebar: false,
        sidebarData: {},
      }
    },

    computed: {
      currentPage() {
        if (this.isMounted) {
          return this.$refs.table.currentx
        }
        return 0
      },

      queriedItems() {
        // return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
      }
    },
    methods: {
      openDeleteSchoolDialog() {
        this.$vs.dialog({
          type: 'confirm',
          color: 'danger',
          title: `Silmek istediğinize emin misiniz ?`,
          text: 'Silme sonrasında işlem geri alınamayacaktır.',
          accept: this.showAcceptAlert,
          cancel: this.showCancelAlert,
          acceptText: 'Onayla',
          cancelText: 'Vazgeç'
        })
      },
      showAcceptAlert() {
        globalEvents.showAlert("success", "Başarılı", "Silme işlemi tamamlandı");
      },
      showCancelAlert() {
        globalEvents.showAlert("danger", "İptal", "Silme işleminden vazgeçildi");
      },
      toggleDataSidebar(val = false) {
        this.addNewDataSidebar = val
      },
      editData(data) {
        this.sidebarData = data
        this.toggleDataSidebar(true)
      },
      addNewData() {
        this.sidebarData = {};
        this.toggleDataSidebar(true)
      },
      deleteData(id) {
      },
    }
  }
</script>

<style lang="scss">
</style>