<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
              class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4> ÖĞRETMEN {{ Object.entries(this.data).length === 0 ? "EKLE" : "GÜNCELLE" }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"/>
    </div>
    <vs-divider class="mb-0"/>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-8">

        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Adı" v-model="teacherFirstName"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="İkinci Adı" v-model="teacherMediumName"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Soyadı" v-model="teacherLastName"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Kullanıcı Adı" v-model="teacherNickname"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Aktiflik Durumu" v-model="teacherStatus"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Branş" v-model="teacherBranch"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Yetki" v-model="teacherPosition"/>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" label-placeholder="Departman" v-model="departmentId"/>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Gönder</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Vazgeç</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'

  export default {
    name: "TeacherAddOrEditSidebar",
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: () => {
        },
      }
    },
    watch: {
      isSidebarActive(val) {
        if (!val) return
        if (Object.entries(this.data).length === 0) {
          this.initValues()
          this.$validator.reset()
        } else {
          let {
            teacherId, teacherFirstName, teacherMediumName,
            teacherLastName, teacherMail, teacherNickname,
            teacherPassword, teacherStatus, teacherPasswordRetry,
            teacherBranch, teacherPosition, departmentId
          } = JSON.parse(JSON.stringify(this.data))
          this.teacherId = teacherId
          this.teacherFirstName = teacherFirstName
          this.teacherMediumName = teacherMediumName
          this.teacherLastName = teacherLastName
          this.teacherMail = teacherMail
          this.teacherNickname = teacherNickname
          this.teacherPassword = teacherPassword
          this.teacherStatus = teacherStatus
          this.teacherPasswordRetry = teacherPasswordRetry
          this.teacherBranch = teacherBranch
          this.teacherPosition = teacherPosition
          this.departmentId = departmentId

        }
        // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
      }
    },
    data() {
      return {
        teacherId: 1,
        teacherFirstName: "",
        teacherMediumName: "",
        teacherLastName: "",
        teacherMail: "",
        teacherNickname: "",
        teacherPassword: "",
        teacherStatus: "",
        teacherPasswordRetry: "",
        teacherBranch: 1,
        teacherPosition: 1,
        departmentId: 1,

        settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
        },
      }
    },
    computed: {
      isSidebarActiveLocal: {
        get() {
          return this.isSidebarActive
        },
        set(val) {
          if (!val) {
            this.$emit('closeSidebar')
            // this.initValues()
          }
        }
      },
      isFormValid() {
        return this.teacherFirstName && this.teacherLastName
      }
    },
    methods: {
      initValues() {
        if (this.data.teacherId) return;
        this.teacherId = 1;
        this.teacherFirstName = "";
        this.teacherMediumName = "";
        this.teacherLastName = "";
        this.teacherMail = "";
        this.teacherNickname = "";
        this.teacherPassword = "";
        this.teacherStatus = "";
        this.teacherPasswordRetry = "";
        this.teacherBranch = "";
        this.teacherPosition = "";
        this.departmentId = "";
      },
      submitData() {
        this.$validator.validateAll().then(result => {
          if (result) {
            // const obj = {
            //   id: this.dataId,
            //   name: this.dataName,
            //   img: this.dataImg,
            //   category: this.dataCategory,
            //   order_status: this.dataOrder_status,
            //   price: this.dataPrice
            // }
            //
            // if(this.dataId !== null && this.dataId >= 0) {
            //   // this.$store.dispatch("dataList/updateItem", obj).catch(err => { console.error(err) })
            // }else{
            //   delete obj.id
            //   obj.popularity = 0
            //   // this.$store.dispatch("dataList/addItem", obj).catch(err => { console.error(err) })
            // }

            this.$emit('closeSidebar');
            this.initValues()
          }
        })
      }
    },
    components: {
      VuePerfectScrollbar,
    }
  }
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
