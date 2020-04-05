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
      <h4>OKUL {{ Object.entries(this.data).length === 0 ? "EKLE" : "GÜNCELLE" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-8">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Okul Adı" v-model="schoolName"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Web Site" v-model="schoolWebSite"/>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" :disabled="!isFormValid"
                 @click="submitData( schoolId ? 'edit' : 'add')"
      >Kaydet
      </vs-button>
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
        default: () => {
        }
      }
    },
    watch: {
      isSidebarActive(val) {
        if (!val) return;
        if (Object.entries(this.data).length === 0) {
          this.initValues();
          this.$validator.reset();
        } else {
          let {id, schoolName, schoolWebSite, status} = JSON.parse(
            JSON.stringify(this.data)
          );
          this.schoolId = id;
          this.schoolName = schoolName;
          this.schoolWebSite = schoolWebSite;
          this.status = status;
        }
        // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
      }
    },
    data() {
      return {
        schoolId: null,
        schoolName: "",
        schoolWebSite: "",
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
        return !this.errors.any() && this.schoolName && this.schoolWebSite;
      }
    },
    methods: {
      initValues() {
        if (this.data.schoolId) return;
        this.schoolId = null;
        this.schoolName = "";
        this.schoolWebSite = "";
        this.status = false;
      },
      submitData(event) {
        let addData = {
          schoolName: this.schoolName,
          schoolWebSite: this.schoolWebSite,
          status: this.status
        };
        if (event == "add")
          this.$store.dispatch("school/setSchool", addData);
        else {
          addData.id = this.schoolId;
          console.log(this.schoolId)
          this.$store.dispatch("school/editSchool", addData);

        }
        this.isSidebarActiveLocal = false;
        // this.$validator.validateAll().then(result => {
        //   if (result) {
        //     // const obj = {
        //     //   id: this.dataId,
        //     //   name: this.dataName,
        //     //   img: this.dataImg,
        //     //   category: this.dataCategory,
        //     //   order_status: this.dataOrder_status,
        //     //   price: this.dataPrice
        //     // }
        //     //
        //     // if(this.dataId !== null && this.dataId >= 0) {
        //     //   // this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
        //     // }else{
        //     //   delete obj.id
        //     //   obj.popularity = 0
        //     //   // this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
        //     // }

        //     this.$emit("closeSidebar");
        //     this.initValues();
        //   }
        // });
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
