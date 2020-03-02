<template>
  <div id="data-list-list-view" class="data-list-container">
    <!--    okul ekleme ve güncelleme sidebar'ını açar veya kapatır-->
    <school-add-or-edit-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar"
                                :data="sidebarData"/>

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" noDataText="Veri bulunamadı"
              search :data="data">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">

          <!-- ADD NEW -->
          <vx-tooltip text="Okul Ekle">
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

      <template slot="thead">
        <vs-th sort-key="schoolName">Okul Adı</vs-th>
        <vs-th sort-key="schoolWebSite">Web Site</vs-th>
        <vs-th>Düzenle / Sil</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.schoolName }}</p>
          </vs-td>
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.schoolWebSite }}</p>
          </vs-td>


          <vs-td class="whitespace-no-wrap">
            <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="editData(tr)"/>

            <feather-icon icon="TrashIcon" tooltip="sil" svgClasses="w-5 h-5 hover:text-danger stroke-current"
                          class="ml-2"
                          @click.stop="openDeleteSchoolDialog"/>
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>
  import SchoolAddOrEditSidebar from "./School/SchoolAddOrEditSidebar";

  export default {
    name: "SchoolAdd",
    components: {
      SchoolAddOrEditSidebar
    },
    data() {
      return {
        activeConfirm: false,
        data: [{schoolId: 1, schoolName: "Cumhuriyet Üniversitesi", schoolWebSite: "www.cu.edu.tr"},
          {schoolId: 2, schoolName: "Mersin Üniversitesi", schoolWebSite: "www.meu.edu.tr"},
          {schoolId: 3, schoolName: "Adana Üniversitesi", schoolWebSite: "www.acu.edu.tr"},
          {schoolId: 4, schoolName: "Çanakkale 18 Mart Üniversitesi", schoolWebSite: "www.comu.edu.tr"},
          {schoolId: 5, schoolName: "Niğde Üniversitesi", schoolWebSite: "www.nu.edu.tr"},
          {schoolId: 6, schoolName: "Bursa Üniversitesi", schoolWebSite: "www.bu.edu.tr"},
          {schoolId: 7, schoolName: "Kocaeli Üniversitesi", schoolWebSite: "www.ko.edu.tr"},
          {schoolId: 8, schoolName: "İstanbul Üniversitesi", schoolWebSite: "www.iu.edu.tr"},
          {schoolId: 9, schoolName: "Samsun 19 Mayıs Üniversitesi", schoolWebSite: "www.somu.edu.tr"},
        ],
        selected: [],
        // products: [],
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
      products() {
        // return this.$store.state.dataList.products
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
          accept: this.successAlert,
          cancel: this.successAlert,
          acceptText:'Onayla',
          cancelText:'Vazgeç'
        })
      },
      successAlert() {
        this.$vs.notify({
          color: 'danger',
          title: 'Başarılı',
          text: 'Silme işlemi tamamlandı.'
        })
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

<style lang="scss" >

</style>
