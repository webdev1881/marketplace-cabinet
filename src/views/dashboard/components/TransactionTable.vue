<template>

  <el-table stripe :data="list" height="400" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Замовлення ID" width="150">
      <template slot-scope="scope">
        {{ scope.row.id  }}
      </template>
    </el-table-column>
    <el-table-column label="Сумма" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.price  }} грн.
      </template>
    </el-table-column>
    <el-table-column label="Статус" width="100" align="center">
      <template slot-scope="{row}">
        <el-tag :type="row.status ">
          {{ 'статус' }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// import { transactionList } from '@/api/remote-search'
import shop from '@/api/my/products.json'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log( shop )
      this.list = shop.results
    }
  }
}
</script>
