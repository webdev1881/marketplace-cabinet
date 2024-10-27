<template>
  <div class="app-container">
    <h3>Знижки</h3>
    <div style="margin-bottom:20px;" class="filter-container">
      <el-input v-model="listQuery.search" placeholder="Найменування" style="width: 370px; margin: 0 10px 10px 0" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Пошук
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Додати
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Експорт
      </el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        Менеджер
      </el-checkbox> -->
    </div>

      <!-- height="600" -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Знижка" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Начало действия" width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.valid_from | date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Конец действия" width="150px"> align="center">
        <template slot-scope="{row}">
          <span>{{ row.valid_to | date  }}</span>
        </template>
      </el-table-column>

        <el-table-column label="Cтатус" width="115px"> align="center">
          <template slot-scope="{row}">
            <span>{{ status[row.status-1].value }}</span>
          </template>
        </el-table-column>

      <el-table-column label="Значение" align="center" width="95">
        <template slot-scope="{row}">
          <span class="link-type">{{ row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Действие" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button :disabled="row.can_edit" type="primary" size="mini" @click="handleUpdate(row)">
            Редактировать
          </el-button>
          <el-button :disabled="row.can_delete" v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.page_size" @pagination="getList" />

    <el-dialog class="dialog" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top" label-width="70px" style="width: 400px; margin-left:50px;">

        <el-form-item label="Начало действия" prop="valid_from" >
          <el-date-picker v-model="temp.valid_from" type="datetime" placeholder="Введите дату и время" />
        </el-form-item>

        <el-form-item label="Конец действия"  prop="valid_to">
          <el-date-picker v-model="temp.valid_to" type="datetime" placeholder="Введите дату и время" />
        </el-form-item>

        <el-form-item label="Найменування" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>

        <el-form-item label="Статус" prop="status">
          <el-select @change="changeStatus" style="width: 100%;" v-model="temp.status_display" placeholder="Пожалуйста выберите">
            <el-option v-for="item in status" :key="item.id" temp.status="item.id" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item  label="Значение, %" prop="price">
          <el-input v-model="temp.value"></el-input>
        </el-form-item>


        <el-form-item label="Описание"  prop="description">
          <el-input v-model="temp.description" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Пожалуйста введите" />
        </el-form-item>

      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Отменить
        </el-button>
        <el-button :disabled="disabled_submit" type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Сохранить
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchDiscount,  createDiscount, updateDiscount, deleteDiscount } from '@/api/discount'
import waves from '@/directive/waves'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

import { ValidationProvider } from "vee-validate";

export default {
  name: 'ComplexTable',
  components: { Pagination, ValidationProvider },
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

      // disabled_submit: false,
      disabled_submit: false,

      status: [
       { 'id': 1, value: 'Черновик'},
       { 'id': 2, value: 'Действующий'},
       { 'id': 3, value: 'Отменённый'},
       { 'id': 4, value: 'Завершенный'},
      ],

      selectStatus: 'Черновик',
      selectType: 'Процент',


      tableKey: 0,
      list: null,
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
      // calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        name: '',
        number: +new Date(),
        description: '',
        valid_from: new Date(),
        valid_to: new Date(),
        status: '',
        status_display: '',
        value: null,
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
        name: [{ required: true, message: 'не должно быть пустым', trigger: 'blur' }],
        status: [{ required: true, message: 'не должно быть пустым', trigger: 'blur' }],
        valid_from: [{ type: 'date', required: true, message: 'не должно быть пустым', trigger: 'change' }],
        valid_to: [{ type: 'date', required: true, message: 'не должно быть пустым', trigger: 'change' }],
        description: [{ required: true, message: 'не должно быть пустым', trigger: 'blur' }],
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    console.log( this.list )
  },

  computed: {

 
  },


  methods: {
    getList() {
      this.listLoading = true
      fetchDiscount(this.listQuery).then(response => {
        this.list = response.data.results
        this.total = response.data.count

        // loader
        // setTimeout(() => {
          this.listLoading = false
        // }, 1.5 * 1000)
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
        name: '',
        number: +new Date(),
        description: '',
        valid_from: new Date(),
        valid_to: new Date(),
        status: '',
        status_display: '',
        value: null,
      }
    },

    test() {
      // this.$refs['dataForm'].validate((valid) => {
      //   console.log( valid )
      // })
    },


    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true


      this.$nextTick(() => {
        // console.log( this.disable_submit );
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      let id = this.$route.meta.shop_id
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {

          createDiscount(this.temp, id).then(() => {
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

    changeStatus(val) {
      this.temp.status = this.status.find((p) => p.value === this.temp.status_display).id
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row)

      this.temp.status = row.status
      this.temp.status_display = this.status.find((p) => p.id === row.status).value

      this.temp.valid_from = new Date( row.valid_from )
      this.temp.valid_to = new Date( row.valid_to )

      console.log( this.temp )

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // console.log( this.$refs['dataForm'] )
      this.$refs['dataForm'].validate((valid) => {
        // console.log( valid )
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          updateDiscount(tempData).then(() => {
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
      this.$confirm(row.name , 'Внимание, позиция будет удалена', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          title: 'Успешно',
          duration: 3000,
          message: 'Позиция удалена'
        })
        this.list.splice(index, 1)
        deleteDiscount( row.id,id ).then( () => { console.log( 'Удалено: ' + row.name ) })
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
        // if (j === 'timestamp') {
          return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>

<style >
  .el-dialog__body, 
  .el-form-item,
  .el-form-item__label {
    padding: 0!important;
    margin-bottom: 0;
  }
</style>
