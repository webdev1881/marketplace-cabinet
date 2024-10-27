<template>
  <el-container class="balance">
    <el-row >
        <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Баланс" width="180">
            <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ 20000 | splitNumber}} грн</el-tag>
            </div>
            </template>
        </el-table-column>
        <el-table-column label="">
            <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">
                Пополнить
            </el-button>
            </template>
        </el-table-column>
        </el-table>
    </el-row>

    <el-row >
      <el-col :span="24" style="padding-right:8px;margin-bottom:30px;">
        Последние операции
        <transaction-table />
      </el-col>
    </el-row>

    <!-- <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div>456</el-col>
    </el-row>
    <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"></div>444</el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">555</div></el-col>
    </el-row> -->

  </el-container>
</template>

<script>
import { mapGetters } from "vuex"
import TransactionTable from './components/TransactionTable'
export default {
    components: {
        TransactionTable,
    },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  mounted() {
      // this.tableData.balance = this.info.balance
  },
  computed: {
    ...mapGetters(["shops"]),
  },
};
</script>

<style lang="scss" scoped>

.balance {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 80%;
}

.el-row {
margin-bottom: 20px;
&:last-child {
    margin-bottom: 0;
}
}
.el-col {
border-radius: 4px;
}
.bg-purple-dark {
background: #99a9bf;
}
.bg-purple {
background: #d3dce6;
}
.bg-purple-light {
background: #e5e9f2;
}
.grid-content {
border-radius: 4px;
min-height: 36px;
}
.row-bg {
padding: 10px 0;
background-color: #f9fafc;
}
</style>