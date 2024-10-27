<template>

  <el-table stripe :data="list" style="width: 100%;padding-top: 15px;">

    <el-table-column label="Операция" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.sku  }}
      </template>
    </el-table-column>

    <el-table-column label="Дата" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.published_at | dateFilter  }}
      </template>
    </el-table-column>

    <el-table-column label="Сумма" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.price | splitNumber  }} грн.
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
import { transactionList } from '@/api/remote-search'
import shop from '@/api/my/products.json'
import { fetchBalance } from '@/api/balance'
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
      list: null,

      listQuery: {
        page: 1,
        page_size: 20,
        importance: undefined,
        search: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    async fetchData() {
      let id = await this.$route.meta.shop_id
       this.list = shop.results
        // console.log( id )
      // fetchBalance(this.listQuery, id).then(response => {
      //   console.log( response )
      //   this.list = response.data.results
      // })
    }


  }
}
</script>
