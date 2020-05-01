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
      <h4>BÖLÜM {{ Object.entries(this.data).length === 0 ? "EKLE" : "GÜNCELLE" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-8">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Bölüm Adı" v-model="departmentName" />
          </div>
        </div>
        <div class="vx-row mb-2">
        
           <div class="vx-col w-full mt-4">
             <label class="vs-input--label">Okul Adı</label>
             <v-select id="schoolName" label="schoolName"  v-model="schoolName" :options="schoolList" />
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button
        class="mr-6"
        :disabled="!isFormValid"
        @click="submitData( departmentId ? 'edit' : 'add')"
      >Kaydet</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Vazgeç</vs-button>
      <vs-switch class="ml-4" style="width:100px" color="success" v-model="status">
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
  watch: {
    isSidebarActive(val) {
      if (!val) return;
      if (Object.entries(this.data).length === 0) {
        this.initValues();
        this.$validator.reset();
      } else {
        let { id, departmentName, school, status } = JSON.parse(
          JSON.stringify(this.data)
        );
        this.departmentId = id;
        this.departmentName = departmentName;
        this.schoolName = [{schoolName:school.schoolName,id:school.id}];
        this.status = status;
      }
    }
  },
  data() {
    return {
      departmentId: null,
      departmentName: "",
      schoolName: "",
      status: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    schoolList() {
      return this.$store.state.school.schoolList;
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
      return !this.errors.any() && this.schoolName && this.departmentName;
    }
  },
  methods: {
    initValues() {
      if (this.data.departmentId) return;
      this.departmentId = null;
      this.schoolName = "";
      this.departmentName = "";
      this.status = false;
    },
    submitData(event) {
      let addData = {
        departmentName: this.departmentName,
        status: this.status
      };
      if (event == "add"){
        addData.schoolId= this.schoolName.id,
        this.$store.dispatch("department/setDepartment", addData);
      }
      else {
        addData.schoolId= this.schoolName[0].id,
        addData.id = this.departmentId;
        console.log(this.departmentId);
        this.$store.dispatch("department/editDepartment", addData);
      }
      this.isSidebarActiveLocal = false;
    }
  },
  components: {
    VuePerfectScrollbar,
    vSelect
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
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);
}
</style>
