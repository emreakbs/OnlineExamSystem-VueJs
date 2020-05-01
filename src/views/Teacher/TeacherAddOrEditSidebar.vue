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
            <vs-input class="w-full" label="Adı" v-model="userFirstName" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="İkinci Adı" v-model="userMediumName" />
          </div>
        </div>

        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Soyadı" v-model="userLastName" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Kullanıcı Adı" v-model="userNickName" />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Mail" v-model="userMail" />
          </div>
        </div>
        <div class="vx-row mb-2" v-if="Object.entries(this.data).length === 0">
          <div class="vx-col w-full">
            <vs-input class="w-full" type="password" label="Şifre" v-model="userPassword" />
          </div>
        </div>
        <div class="vx-row mb-2" v-if="Object.entries(this.data).length === 0">
          <div class="vx-col w-full">
            <vs-input
              class="w-full"
              type="password"
              label="Şifre (Tekrar)"
              v-model="userPasswordRetry"
            />
          </div>
        </div>
        
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <label class="vs-input--label">Branş Adı</label>
            <v-select
              id="branchName"
              label="branchName"
              v-model="userBranch"
              :options="branchList"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <label class="vs-input--label" >Yetki Seviyesi</label>
            <v-select
              id="userPosition"
              label="userPosition"
              v-model="userPosition"
              :options="positionList"
            />
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <label class="vs-input--label">Bölüm Adı</label>
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
        @click="submitData( userId ? 'edit' : 'add')"
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
          this.userFirstName &&
          this.userLastName &&
          this.userNickName &&
          this.userMail &&
          this.userBranch &&
          this.userPosition &&
          this.departmentId &&
          this.userPassword === this.userPasswordRetry
        );
      }
      return (
        this.userFirstName &&
        this.userLastName &&
        this.userNickName &&
        this.userMail &&
        this.userBranch &&
        this.userPosition &&
        this.departmentId
      );
    }
  },
  data() {
    return {
      options: [],
      positionList: [
        { userPosition: "Master Admin", id: 1 },
        { userPosition: "Öğretmen", id: 2 }
      ],
      userId: null,
      userFirstName: "",
      userMediumName: "",
      userLastName: "",
      userMail: "",
      userNickName: "",
      userPassword: "",
      userPasswordRetry: "",
      userBranch: null,
      userPosition: null,
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
      if (this.data.userId) return;
      this.userId = null;
      this.userFirstName = "";
      this.userMediumName = "";
      this.userLastName = "";
      this.userMail = "";
      this.userNickName = "";
      this.userPassword = "";
      this.userPasswordRetry = "";
      this.userBranch = null;
      this.userPosition = "";
      this.departmentId = "";
      this.status = false;
    },
    submitData(event) {
      let addData = {
        userFirstName: this.userFirstName,
        userMediumName: this.userMediumName,
        userLastName: this.userLastName,
        userMail: this.userMail,
        userNickName: this.userNickName,
        userPassword: this.userPassword,
        userLevel: this.userPosition[0]
          ? this.userPosition[0].id
          : this.userPosition.id,
        departmentId: this.departmentId[0]
          ? this.departmentId[0].id
          : this.departmentId.id,
        branchId: this.userBranch[0]
          ? this.userBranch[0].id
          : this.userBranch.id,
        status: this.status
      };
      if (event == "add") {
        addData.userPasswordRetry = this.userPasswordRetry;

        this.$store.dispatch("teacher/setTeacher", addData);
      } else {
        addData.id = this.userId;
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
          userFirstName,
          userMediumName,
          userLastName,
          userMail,
          userNickName,
          userPassword,
          userPasswordRetry,
          branch,
          userLevel,
          department,
          status
        } = JSON.parse(JSON.stringify(this.data));
        this.userId = id;
        this.userFirstName = userFirstName;
        this.userMediumName = userMediumName;
        this.userLastName = userLastName;
        this.userMail = userMail;
        this.userNickName = userNickName;
        this.userPassword = userPassword;
        this.userPasswordRetry = userPasswordRetry;
        this.userBranch = [{ branchName: branch.branchName, id: branch.id }];
        this.userPosition = this.positionFilter(userLevel);
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
