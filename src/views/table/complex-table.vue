<template>
  <div class="app-container">
    <div style="margin-bottom:20px;" class="filter-container">
      <el-input v-model="listQuery.search" placeholder="Найменування" style="width: 370px; margin: 0 10px 10px 0"
        class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        {{ 'find' | localize }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        {{ 'add' | localize }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
        @click="handleDownload">
        {{ 'export' | localize }}
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey = tableKey + 1">
        {{ 'manager' | localize }}
      </el-checkbox>
    </div>

    <!-- height="600" -->
    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="SKU" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sku }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="'name' | localize" width="300px">
        <template slot-scope="{row}">
          <span class="link-type pointer" @click="handleUpdate(row)">{{ row.name_uk }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Товарна група" width="200px" align="center">
        <template slot-scope="{row}">
          <span class="link-type custom_group" @click="handleUpdate(row)">{{ row.category.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Бренд" width="160px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.brand">{{ row.brand.name }}</span>
          <span v-else>{{ }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="showReviewer" label="Менеджер" width="110px" align="center">
        <template>
          <span style="color:red;">{{ 'manager_1' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Цiна, грн." align="center" width="95">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.price }}</span>
        </template>
      </el-table-column>





      <el-table-column label="Действие" align="center" width="350px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <el-button :disabled="!row.can_edit" type="primary" size="mini" @click="handleUpdate(row)">
            Редагувати
          </el-button>

          <div class="is_pub">
            <el-button v-if="row.can_publish" size="mini" type="success" @click="handleModifyStatus(row, 'published')">
              Публікувати
            </el-button>

            <el-button v-else size="mini" style="width: 110px;" @click="handleModifyStatus(row, 'draft')">
              Чернетка
            </el-button>
          </div>


          <el-button :disabled="!row.can_delete" size="mini" type="danger" @click="handleDelete(row, $index)">
            Видалити
          </el-button>

        </template>
      </el-table-column>





    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size"
      @pagination="getList" />

    <!-- ___________________________________________DIALOG -->

    <el-dialog :top="'5vh'" :width="'70%'" class="dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <div class="dialog_header">
        <el-button size="small" @click="dialogFormVisible = false">
          Отменить
        </el-button>
        <el-button size="small" type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Сохранить
        </el-button>
      </div>

      <el-tabs v-model="activeName" style="margin-top:15px;">


        <el-tab-pane label="Продукт" name="product">
          <keep-alive>
            <el-form ref="dataForm" :rules="rules" :model="temp">
              <div class="form_top">
                <el-form-item class="form_item sku" label="SKU" prop="name_ru"><el-input
                    v-model="temp.sku" /></el-form-item>

                <el-form-item class="form_item brand_select" label="Бренд" v-if="temp.brand">
                  <el-select v-model="temp.brand.name" autocomplete filterable remote reserve-keyword
                    placeholder="Пошук Бренду" :remote-method="searchBrand" :loading="loading">
                    <el-option v-for="item in brandOptions" :key="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item class="form_item save_cat" label="Категория">
                  <el-select v-model="temp.category.name" autocomplete filterable remote reserve-keyword
                    placeholder="Пошук Категорії" :remote-method="searchCategory" :loading="loading">
                    <el-option v-for="item in catOptions" :key="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

              </div>

              <div class="form_lang">

                <div class="lang_left">
                  <el-form-item class="form_item name" label="Найменування, УКР" prop="name_ru"><el-input
                      class="form_item" v-model="temp.name_uk" /></el-form-item>
                  <vue-editor :editor-toolbar="customToolbar" id="editor1"
                    v-model="temp.long_description_uk"></vue-editor>
                </div>

                <div class="lang_right">
                  <el-form-item class="form_item" label="Найменування, РУС" prop="name_ru"><el-input class="form_item"
                      v-model="temp.name_uk" /></el-form-item>
                  <vue-editor :editor-toolbar="customToolbar" id="editor2"
                    v-model="temp.long_description_ru"></vue-editor>
                </div>

              </div>

              <div class="form_bottom">

                <div class="bottom_left">
                  <el-form-item class="price" label="Цена" prop="price">
                    <el-input v-model.number="temp.price"></el-input>
                  </el-form-item>

                  <el-form-item class="status" label="Статус">
                    <el-select v-model="temp.status" class="selec" placeholder="Пожалуйста выберите">
                      <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item[0]" />
                    </el-select>
                  </el-form-item>
                </div>


              </div>
            </el-form>
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="Характеристики" name="props">
          <keep-alive>

          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="Фото | Видео">
          <keep-alive>
            <div class="components-container board">
              <div class="img">
                <input @change="onfileSelect" type="file" id="upload" hidden />
                <label for="upload" class="select">Загрузить изображение</label>
                <span class="tip">Файл jpg / png. Размер не более 500Кб</span>
                <div v-for=" (item, index) in imgList " :key="index" class="item">
                  <img :src="item.url" alt="" class="item_image">
                  <div class="item_name"> {{ item.name }} </div>
                  {{ item.can_delete }}
                  <button v-if="item.can_delete" disabled id='close'></button>
                </div>
              </div>
              <div class="video">
                <input @change="onfileSelect" type="file" id="upload" hidden />
                <label for="upload" class="select">Загрузить видео</label>
                <span class="tip">Файл avi, mp4</span>
                <div class="item">
                  <iframe class="item_image" controls=0 width="90" height="90"
                    src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0"></iframe>
                  <div class="item_name">test video</div>
                  <button id='close'></button>
                </div>
              </div>
            </div>
          </keep-alive>
        </el-tab-pane>

      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">
          Отменить
        </el-button>
        <el-button size="small" type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Сохранить
        </el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { fetchList, createArticle, updateArticle, deleteArticle, fetchBrands, fetchCategories } from '@/api/article'
import { uploadImg, fetchImg } from '@/api/media'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
import { VueEditor } from "vue2-editor";
// import localizeFilter from "@/filters/localize.filter"

export default {
  name: 'ComplexTable',
  components: { Pagination, VueEditor },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      active_img: "img1",
      activeName: 'product',
      active_scr: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCEpshJwJ8hZJrjPtmH3EVfbHN327f9xS_g&usqp=CAU",
      tabMapOptions: [
        { label: 'Продукт', key: 'product' },
        { label: 'Характеристики', key: 'props' },
        { label: 'Фото', key: 'media' },
      ],
      imgList: [],
      tableKey: 0,
      list: null,
      test: 'QQQ',
      brandOptions: [],
      catOptions: [],
      categories: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" }
        ]
      ],

      brands: [],
      value: [],

      fileList: [
        { name: 'товар1.jpeg', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqCEpshJwJ8hZJrjPtmH3EVfbHN327f9xS_g&usqp=CAU' },
        { name: 'товар2.jpeg', url: 'https://domkotlov.by/images/product/000/000471/426-novyj-plyus-vajlant.jpg' },
        { name: 'товар3.jpeg', url: 'https://teplovoz.ua/image/cache/catalog/products/rinnai-kmf-3_3-380x380.jpg' },
        { name: 'товар4.jpeg', url: 'https://i2.wp.com/teplogalaxy.ru/wp-content/uploads/2017/07/Usovershenstvovaniya-novyh-kotlov-Vaillant.png' },
      ],
      loading: false,

      timeout: null,
      search: [],
      state: '',
      links: [
        { "value": "vue", "link": "https://github.com/vuejs/vue" },
        { "value": "element", "link": "https://github.com/ElemeFE/element" },
        { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
        { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
        { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
        { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
        { "value": "babel", "link": "https://github.com/babel/babel" }
      ],

      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
        importance: undefined,
        search: undefined,
        type: undefined,
        sort: '-id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['Опубликовано', 'Черновик', 'Удален'],
      showReviewer: false,
      temp: {
        id: undefined,
        sku: '',
        timestamp: new Date(),
        name_ru: '',
        name_uk: '',
        brand: { "name": '' },
        category: { "name": '' },
        short_description_ru: '',
        short_description_uk: '',
        status: 'Опубликовано',
        price: null,
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Обновить',
        create: 'Создать'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        price: [{ required: true, message: 'не должно быть пустым', trigger: 'blur' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        name_ru: [{ required: true, message: 'не должно быть пустым', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    // console.log( 'created Table' )
    this.getList()
    this.getBrands()
    this.getCategories()
    this.requ()

    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },

  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },

  methods: {

    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },

    querySearch(queryString, cb) {
      var links = this.brands;
      var results = queryString ? links.filter(this.createFilter(queryString)) : links;
      // call callback function to return suggestions
      cb(results);
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      // }, 500 );
    },
    createFilter(queryString) {
      return (link) => {
        // console.log( link )
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item)
    },

    async getList() {
      let id = await this.$route.meta.shop_id
      console.log('id')
      console.log(id)
      this.listLoading = true
      fetchList(this.listQuery, id).then(response => {
        this.list = response.data.results
        // console.log(this.list)
        this.total = response.data.count
        // loader
        // setTimeout(() => {
        this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    async getBrands() {
      let id = await this.$route.meta.shop_id
      this.listLoading = true
      fetchBrands(this.listQuery, id).then(response => {
        let data = response.data.results
        data.map(b => {
          this.brands.push({ 'value': b.name })
        })
        this.listLoading = false
      })
    },

    async getCategories() {
      let id = await this.$route.meta.shop_id
      this.listLoading = true
      fetchCategories(this.listQuery, id).then(response => {
        let data = response.data.results
        // console.log(data)
        data.map(b => {
          this.categories.push({
            'value': b.name,
            'id': b.id,
            'parent': b.parent,
          })
        })
        this.listLoading = false
      })
    },

    requ() {
      // console.log( this.categories )
      let cat = this.categories
      let newCat = []

      cat.forEach(p => {
        console.log(p)
      })

    },


    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Успішно',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      // console.log( 'sort: ' + JSON.stringify(data) )
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        sku: '',
        timestamp: new Date(),
        name_ru: '',
        name_uk: '',
        brand: { "name": '' },
        category: { "name": '' },
        short_description_ru: '',
        short_description_uk: '',
        status: 'Опубликовано',
        price: null,
        // id: undefined,
        // sku: null,
        // importance: 1,
        // remark: '',
        // timestamp: new Date(),
        // title: '',
        // status: 'Опубликовано',
        // type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.activeName = 'product',
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.sku = parseInt(Math.random() * 100) + 1024 // mock a sku
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false

            this.getList() // upd

            this.$notify({
              title: 'Успешно',
              message: 'Позиция создана',
              type: 'success',
              duration: 3000
            })
          })
        }
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row)
      if (!this.temp.brand.name) {
        // console.error( 'No Brand' )
        this.temp.brand.name = ''
      }
      this.temp.brand_id = row.brand.id
      this.temp.category_id = row.category.id

      console.log(this.$refs)

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.activeName = 'product',

        this.getImg()

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    async updateData() {
      let id = await this.$route.meta.shop_id
      this.$refs['dataForm'].validate((valid) => {
        // console.log( valid )
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp)
          updateArticle(tempData, id).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.getList() // upd
            this.$notify({
              title: 'Успешно',
              message: 'Позиция обновлена',
              type: 'success',
              duration: 3000
            })
          })
        }
      })
    },

    handleDelete(row, index) {
      this.$confirm(row.name_ru, 'Внимание, позиция будет удалена', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          title: 'Успешно',
          message: 'Позиция удалена'
        })
        this.list.splice(index, 1)
        deleteArticle(row.id).then(() => { console.log('Удалено: ' + row.name) })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Удаление отменено'
        })
      })
    },


    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // console.log( excel )
        const tHeader = ['ID', 'SKU', 'Найменування', 'Найменування повне', 'Цена, грн.']
        const filterVal = ['id', 'sku', 'name_ru', 'long_description_ru', 'price']
        const data = this.formatJson(filterVal)
        // console.log( data )
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    car(el) {
      console.log(el)
      console.log(this.$refs)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      console.log(file)
      console.log(fileList)
    },

    searchBrand(query) {
      let id = this.$route.meta.shop_id
      if (query !== '') {
        this.loading = true;
        fetchBrands({ search: query }, id).then(response => {
          let data = response.data.results
          this.brandOptions = data.map(i => {
            return { 'value': i.name }
          })
          this.listLoading = false
          this.loading = false;
        })
        // this.options = this.brands.filter(item => {
        //   return item.value.toLowerCase()
        //     .indexOf(query.toLowerCase()) > -1;
        // })
        // console.log( this.options )

      } else {
        this.brandOptions = [];
      }
    },

    searchCategory(query) {
      let id = this.$route.meta.shop_id
      if (query !== '') {
        this.loading = true;
        fetchCategories({ search: query }, id).then(response => {
          let data = response.data.results
          this.catOptions = data.map(i => {
            return { 'value': i.name }
          })
          this.listLoading = false
          this.loading = false;
        })
        // this.options = this.brands.filter(item => {
        //   return item.value.toLowerCase()
        //     .indexOf(query.toLowerCase()) > -1;
        // })
        // console.log( this.options )

      } else {
        this.catOptions = [];
      }
    },

    test1() {
      console.log(this.$refs.img1[0].currentSrc);
      this.active_scr = this.$refs.img1[0].currentSrc
      this.active_img = 'img1'
    },
    test2() {
      this.active_scr = this.$refs.img2[0].currentSrc
      this.active_img = 'img2'
    },
    test3() {
      this.active_scr = this.$refs.img3[0].currentSrc
      this.active_img = 'img3'
    },
    test4() {
      this.active_scr = this.$refs.img4[0].currentSrc
      this.active_img = 'img4'
    },
    test5() {
      this.active_scr = this.$refs.img5[0].currentSrc
      this.active_img = 'img5'
    },



    async onfileSelect(e) {
      this.selectedFile = await e.target.files[0]
      uploadImg(this.selectedFile, 1)
        .then(res => {
          let data = res.data
          this.imgList.unshift({ name: data.file_name, url: data.file, can_delete: file.can_delete })
        })
    },

    getImg() {
      let id = this.$route.meta.shop_id
      fetchImg(id, this.temp.id).then(res => {
        let data = res.data
        data.map(file => {
          console.log(file)
          this.imgList.push({ name: file.file_name, url: file.file, can_delete: file.can_delete })
        })
      })
    }




  }
}
</script>

<style>
/* .link-type {
  background-color: red;
} */
.el-table td {
  padding: 0;
}
</style>

<style lang='scss'>
.custom_group {
  display: flex;
  justify-content: center;
}

// .el-dialog__body, 
// .el-form-item,
// .el-form-item__label {
//   padding: 0!important;
//   margin-bottom: 0;
// }

// .dataForm {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 25px;
//   .left-right-form {
//     display: flex;
//     justify-content: space-around;
//     .left-form, .right-form {
//       .form_item {
//         width: 360px;
//       }
//     }
//   }
//   .common {
//     display: flex;
//     justify-content: space-around;
//     // padding: 0 30px;
//   }
//   .sku {
//     width: 200px;
//     margin-left: 25px;
//   }
//   .form_footer {
//     display: flex;
//   }
// }

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0 auto;
}

.medium {
  margin: 0 auto;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  // background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  // background-color: #d3dce6;
}


.is_pub {
  display: inline-table;
  margin: 0 5px;
}

.form_item {
  width: 100%;
}

.auto,
.selec {
  width: 100%;
}

.form_top {
  display: flex;

  @media (max-width: 1200px) {
    display: block;
  }
}

.form_lang,
.form_bottom {
  display: flex;

  .lang_left,
  .lang_right {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  @media (max-width: 1200px) {
    display: block;
  }
}

.bottom_left,
.bottom_right {
  width: 100%;
}

.bottom_right {
  margin: 15px 0 0 15px;
}

.bottom_left {
  display: flex;
}


#editor1,
#editor2 {
  height: 150px;
}

.ql-container {
  height: auto;
}

.item__image {
  height: 300px;
  width: 200px;
}

.sku,
.lang_left {
  margin-right: 15px;
}

.el-dialog__body {
  padding: 0 20px;
}

.bottom_right {
  z-index: 2;
}

.el-select {
  width: 100%;
}

.brand_select {
  margin-right: 15px;
}

.save_cat {
  position: relative;
}

.save_btn {
  position: absolute;
}

.dialog_header {
  display: flex;
  justify-content: end;
}

.pointer {
  cursor: pointer;
}

.bottom_right {
  display: flex;
  width: 100%;
}

.upload-demo {
  margin-right: 30px;
  width: 40%;
}

.photo {
  display: flex;
  width: 50%;
}

.active_img {
  border: 2px solid #f08f25;
  border-radius: 2px;
}


.photo_slider {
  margin-top: 40px;

  img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}

.big {
  img {
    margin-top: 30px;
    margin-left: 20px;
    width: 400px;
    height: 400px;
  }
}

.price,
.status {
  width: 50%;
}

.price {
  margin-right: 15px;
}

// _______________________________________________


.board {
  display: flex;
  width: 100%;
  padding: 0 0 35px 35px;
}

.select {
  background-color: #304156;
  color: white;
  display: inline-block;
  padding: 0.5rem;
  font-weight: 400;
  font-size: 14px;
  border-radius: 0.2rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    color: white;
    background: #596778;
  }
}

.tip {
  margin-top: 4px;
  display: block;
  font-size: 14px;
  margin-bottom: 25px;
}


.img,
.video {
  width: 50%;
  margin-right: 45px;
}

.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #4e5f74;
  margin-bottom: 15px;
  cursor: pointer;

  .item_image {
    width: 90px;
    height: 90px;
    margin-right: 25px;
    transition: transform .2s;

    &:hover {
      transform: scale(2);
    }
  }

  .item_name {
    color: #304156;
    max-width: 240px;
    word-break: break-word;
  }
}


#close {
  position: absolute;
  top: 3px;
  right: 3px;
  overflow: hidden;
  border: none;
  padding: 0;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: transparent;
  color: #304156;
  font: inherit;
  text-indent: 100%;
  cursor: pointer;

  &:focus {
    outline: solid 0 transparent;
    // box-shadow: 0 0 0 2px rgb(114, 22, 22)
  }

  &:hover {
    background: rgba(29, 161, 142, .1)
  }

  &:before,
  &:after {
    position: absolute;
    top: 15%;
    left: calc(50% - .0625em);
    width: .125em;
    height: 70%;
    border-radius: .125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: ''
  }

  &:after {
    transform: rotate(-45deg);
  }
}
</style>
