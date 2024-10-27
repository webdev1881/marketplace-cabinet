<template>
  <div class="dashboard-container">

    <!-- <div class="user_info">
      <div class="dashboard-text">имя: {{ info.first_name }}</div>
      <div class="dashboard-text">фамилия: {{ info.last_name }}</div>
      <div class="dashboard-text">отчество: {{ info.middle_name }}</div>
      <div class="dashboard-text">телефое: {{ info.phone }}</div>
      <div class="dashboard-text">почта: {{ info.email }}</div>
    </div> -->

    <!-- <el-tabs v-model="activeName" >
      <el-tab-pane label="Магазин 1" @tab-click="handleClick" name="first">
        <div class="shop_logo"> Лого: <img class="shop_logo_img" src="`${shops[0].logo}`" alt=""> </div>
        <div class="shop_name"> Найменування: {{ shops[0].name }} </div>
        <div class="shop_id"> ID: {{ shops[0].id }} </div>
        <div class="shop_status"> Активный: {{ shops[0].is_active }} </div>
      </el-tab-pane>
      <el-tab-pane label="Магазин 2" name="second">Магазин 2</el-tab-pane>
      <el-tab-pane label="Магазин 3" name="third">Магазин 3</el-tab-pane>
      <el-tab-pane label="Магазин 4" name="fourth">Магазин 4</el-tab-pane>
      <el-tab-pane label="Магазин 5" name="five">Магазин 5</el-tab-pane>
      <el-tab-pane label="Магазин 6" name="six">Магазин 6</el-tab-pane>
      <el-tab-pane label="Магазин 7" name="seven">Магазин 7</el-tab-pane>
    </el-tabs> -->

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="">

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'


import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'

const lineChartData = {
  newVisitis: {
    expectedData: [10, 12, 16, 13, 10, 16, 16],
    actualData: [12, 8, 9, 15, 16, 14, 14]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}


export default {
  name: 'Dashboard',
  components: {

    PanelGroup,
    LineChart,
    PieChart,
    BarChart,
    TransactionTable,
  },
  data() {
    return {
      activeName: 'first',
      lineChartData: lineChartData.newVisitis
    };
  },
  computed: {
    ...mapGetters([
      'info', 'shops'
    ])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  },
  mounted() {
    // console.log( this.$store )
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 15px;
    line-height: 20px;
  }
}

.user_info {
  margin-bottom: 30px;
}
</style>
