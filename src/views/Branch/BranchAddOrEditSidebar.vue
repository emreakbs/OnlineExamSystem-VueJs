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
      <h4>BRANŞ {{ Object.entries(this.data).length === 0 ? "EKLE" : "GÜNCELLE" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-8">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label="Branş Adı" v-model="branchName" />
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button
        class="mr-6"
        :disabled="!isFormValid"
        @click="submitData( branchId ? 'edit' : 'add')"
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
        let { id, branchName, status } = JSON.parse(JSON.stringify(this.data));
        this.branchId = id;
        this.branchName = branchName;
        this.status = status;
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    }
  },
  data() {
    return {
      branchId: null,
      branchName: "",
      status: false,
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          // this.initValues()
        }
      }
    },
    isFormValid() {
      return this.branchName
    }
  },
  methods: {
    initValues() {
      if (this.data.branchId) return;
      this.branchId = null;
      this.branchName = "";
      this.status = false;
    },
    submitData(event) {
      let addData = {
        branchName: this.branchName,
        status: this.status
      };
      if (event == "add") this.$store.dispatch("branch/setBranch", addData);
      else {
        addData.id = this.branchId;
        console.log(this.branchId);
        this.$store.dispatch("branch/editBranch", addData);
      }
      this.isSidebarActiveLocal = false;
    }
  },
  components: {
    VuePerfectScrollbar
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
