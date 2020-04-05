<template>
  <vs-card>
  <div id="data-list-list-view" class="data-list-container">
    <!--    okul ekleme ve güncelleme sidebar'ını açar veya kapatır-->
    <branch-add-or-edit-sidebar
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="toggleDataSidebar"
      :data="sidebarData"
    />
    <vs-table
      ref="table"
      multiple
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      noDataText="Veri bulunamadı"
      search
      :data="data"
    >
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- ADD NEW -->
          <vx-tooltip text="Braanş Ekle">
            <div
              class="p-4 border border-solid mb-4 d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-small"
              @click="addNewData"
            >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4"/>
            </div>
          </vx-tooltip>
        </div>

        <!-- ITEMS PER PAGE -->
        <vx-tooltip text="Satır sayısı">
          <vs-dropdown
            vs-trigger-click
            class="per-page cursor-pointer mb-4 mr-4 items-center items-per-page-handler"
          >
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-small"
            >
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <vs-dropdown-menu>
              <vs-dropdown-item @click="itemsPerPage=5">
                <span :class="itemsPerPage== '5' ? 'per-page-span-color':''">5</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=10">
                <span :class="itemsPerPage== '10' ? 'per-page-span-color':''">10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=15">
                <span :class="itemsPerPage== '15' ? 'per-page-span-color':''">15</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=20">
                <span :class="itemsPerPage== '20' ? 'per-page-span-color':''">20</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </vx-tooltip>
      </div>

      <template slot="thead">
        <vs-th sort-key="branchName">Branş Adı</vs-th>
        <vs-th sort-key="status">Aktif</vs-th>
        <vs-th>Düzenle / Sil</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.branchName }}</p>
          </vs-td>
          <vs-td>
            <vs-button type="flat" radius
                       :icon="tr.status ? 'done':'clear'"
                       :color="getStatusColor(tr.status)"
            ></vs-button>
          </vs-td>
          <vs-td class="whitespace-no-wrap">
            <feather-icon
              icon="EditIcon"
              svgClasses="w-5 h-5 hover:text-primary stroke-current"
              @click.stop="editData(tr)"
            />

            <feather-icon
              icon="TrashIcon"
              tooltip="sil"
              svgClasses="w-5 h-5 hover:text-danger stroke-current"
              class="ml-2"
              @click.stop="openDeleteBranchDialog(tr.id)"
            />
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
  </vs-card>
</template>


<script>
  import BranchAddOrEditSidebar from "./Branch/BranchAddOrEditSidebar";
  import {globalEvents} from "../globalEvents";

  export default {
    name: "BranchAdd",
    components: {
      BranchAddOrEditSidebar
    },
    created() {
      this.$store.dispatch("branch/getBranches");
    },
    data() {
      return {
        activeConfirm: false,

        selected: [],
        // products: [],
        itemsPerPage: 5,
        isMounted: false,

        // Data Sidebar
        addNewDataSidebar: false,
        sidebarData: {},
        deleteItemId: null,
      };
    },
    watch: {},
    computed: {
      data() {
        return this.$store.state.branch.branchList
      },
      currentPage() {
        if (this.isMounted) {
          return this.$refs.table.currentx;
        }
        return 0;
      },
      products() {
        // return this.$store.state.dataList.products
      },
      queriedItems() {
        // return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
      }
    },
    methods: {
      getStatusColor(status) {
        return globalEvents.getStatusColor(status);
      },
      openDeleteBranchDialog(id) {
        this.deleteItemId = id;
        this.$vs.dialog({
          type: "confirm",
          color: "danger",
          title: `Silmek istediğinize emin misiniz ?`,
          text: "Silme sonrasında işlem geri alınamayacaktır.",
          accept: this.deleteBranch,
          cancel: this.cancelAlert,
          acceptText: "Onayla",
          cancelText: "Vazgeç"
        });
      },
      deleteBranch() {
        this.$store.dispatch("branch/removeBranch", this.deleteItemId);
      },
      cancelAlert() {
        globalEvents.showAlert("danger", "İptal", "Silme işlemi iptal edildi");

      },
      toggleDataSidebar(val = false)
      {
        this.addNewDataSidebar = val;
      },
      editData(data) {
        this.sidebarData = data;
        this.toggleDataSidebar(true);
      },
      addNewData() {
        this.sidebarData = {};
        this.toggleDataSidebar(true);
      },
      deleteData(id) {
      }
    }
  };
</script>

<style>

</style>