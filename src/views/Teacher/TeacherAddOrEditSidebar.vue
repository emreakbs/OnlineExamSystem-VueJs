<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>ÖĞRETMEN {{ Object.entries(this.data).length === 0 ? "EKLE" : "GÜNCELLE" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer" />
    </div>
    <vs-divider class="mb-0" />

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-8">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Adı" v-model="teacherFirstName" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="İkinci Adı" v-model="teacherMediumName" />
          </div>
        </div>

        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Soyadı" v-model="teacherLastName" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Kullanıcı Adı" v-model="teacherNickname" />
          </div>
        </div>
        <div class="vx-row mb-2" v-if="Object.entries(this.data).length === 0">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Şifre" v-model="teacherPassword" />
          </div>
        </div>
        <div class="vx-row mb-2" v-if="Object.entries(this.data).length === 0">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              label-placeholder="Şifre (Tekrar)"
              v-model="teacherPasswordRetry"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Mail" v-model="teacherMail" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full mt-4">
            <v-select
              id="branchName"
              label="branchName"
              v-model="teacherBranch"
              :options="branchList"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full mt-4">
            <v-select
              id="teacherPosition"
              label="teacherPosition"
              v-model="teacherPosition"
              :options="positionList"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full mt-4">
            <v-select
              id="departmentId"
              label="departmentName"
              v-model="departmentId"
              :options="departmentListSchoolName"
            />
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button
        class="mr-6"
        @click="submitData( teacherId ? 'edit' : 'add')"
        :disabled="!isFormValid"
      >Gönder</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Vazgeç</vs-button>
      <vs-switch class="ml-5" style="width:100px" color="success" v-model="status">
        <span slot="on">Aktif durumda</span>
        <span slot="off">Pasif durumda</span>
      </vs-switch>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import vSelect from "vue-select";
export default {
  name: "TeacherAddOrEditSidebar",
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    branchList() {
      return this.$store.state.branch.branchList;
    },
    departmentListSchoolName() {
      return this.$store.state.department.departmentListSchoolName;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          this.initValues();
        }
      }
    },
    isFormValid() {
      if (Object.entries(this.data).length === 0) {
        return (
          this.teacherFirstName &&
          this.teacherLastName &&
          this.teacherNickname &&
          this.teacherMail &&
          this.teacherBranch &&
          this.teacherPosition &&
          this.departmentId &&
          this.teacherPassword === this.teacherPasswordRetry
        );
      }
      return (
        this.teacherFirstName &&
        this.teacherLastName &&
        this.teacherNickname &&
        this.teacherMail &&
        this.teacherBranch &&
        this.teacherPosition &&
        this.departmentId
      );
    }
  },
  data() {
    return {
      options: [],
      positionList: [
        { teacherPosition: "Yönetici", id: 1 },
        { teacherPosition: "Öğretmen", id: 2 }
      ],
      teacherId: null,
      teacherFirstName: "",
      teacherMediumName: "",
      teacherLastName: "",
      teacherMail: "",
      teacherNickname: "",
      teacherPassword: "",
      teacherPasswordRetry: "",
      teacherBranch: null,
      teacherPosition: null,
      departmentId: null,
      status: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  methods: {
    initValues() {
      if (this.data.teacherId) return;
      this.teacherId = null;
      this.teacherFirstName = "";
      this.teacherMediumName = "";
      this.teacherLastName = "";
      this.teacherMail = "";
      this.teacherNickname = "";
      this.teacherPassword = "";
      this.teacherPasswordRetry = "";
      this.teacherBranch = null;
      this.teacherPosition = "";
      this.departmentId = "";
      this.status = false;
    },
    submitData(event) {
      let addData = {
        teacherFirstName: this.teacherFirstName,
        teacherMediumName: this.teacherMediumName,
        teacherLastName: this.teacherLastName,
        teacherMail: this.teacherMail,
        teacherUserName: this.teacherNickname,
        teacherPassword: this.teacherPassword,
        userLevel: this.teacherPosition[0]
          ? this.teacherPosition[0].id
          : this.teacherPosition.id,
        departmentId: this.departmentId[0]
          ? this.departmentId[0].id
          : this.departmentId.id,
        branchId: this.teacherBranch[0]
          ? this.teacherBranch[0].id
          : this.teacherBranch.id,
        status: this.status
      };
      if (event == "add") {
        addData.teacherPasswordRetry = this.teacherPasswordRetry;

        this.$store.dispatch("teacher/setTeacher", addData);
      } else {
        addData.id = this.teacherId;
        this.$store.dispatch("teacher/editTeacher", addData);
      }
      this.isSidebarActiveLocal = false;
    },
    positionFilter(id) {
      return this.positionList.filter(item => item.id == id);
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
  },

  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        let {
          id,
          teacherFirstName,
          teacherMediumName,
          teacherLastName,
          teacherMail,
          teacherUserName,
          teacherPassword,
          teacherPasswordRetry,
          branch,
          userLevel,
          department,
          status
        } = JSON.parse(JSON.stringify(this.data));
        this.teacherId = id;
        this.teacherFirstName = teacherFirstName;
        this.teacherMediumName = teacherMediumName;
        this.teacherLastName = teacherLastName;
        this.teacherMail = teacherMail;
        this.teacherNickname = teacherUserName;
        this.teacherPassword = teacherPassword;
        this.teacherPasswordRetry = teacherPasswordRetry;
        this.teacherBranch = [{ branchName: branch.branchName, id: branch.id }];
        this.teacherPosition = this.positionFilter(userLevel);
        this.departmentId = [
          { departmentName: department.departmentName, id: department.id }
        ];
        this.status = status;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);
}
</style>
