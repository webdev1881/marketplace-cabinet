<template>
  <div class="tab-container">
    <!-- <el-tag>Переглянуто ：{{ createdTimes }}</el-tag> -->

    <!-- <div class="picker">
      <div class="picker_title">Період: </div>
      <el-date-picker
        v-model="picker"
        type="datetimerange"
        start-placeholder="Початок"
        end-placeholder="Кінець"
        :default-time="['00:00:00']"
        :picker-options="pickerOptions"
        format="yyyy-MM-dd"
        >
      </el-date-picker>
    </div> -->


    <!-- <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" /> -->
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <!-- <keep-alive> -->
          <tab-pane v-if="activeName == item.key" :type="item.key" @create="showCreatedTimes" />
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>

    <!-- ___________________________________________ORDER_DIALOG -->
    <!-- <el-dialog :top="'5vh'" :width="'70%'" class="dialog" :title="'title'" :visible.sync="dialogFormVisible">
    </el-dialog> -->
  </div>
</template>

<script>
import TabPane from './components/TabPane'

export default {
  name: 'Tab',
  components: { TabPane },
  data() {
    return {
      tabMapOptions: [
        { label: 'Нові', key: '1' },
        { label: 'В обробці', key: '2' },
        { label: 'Відправлено', key: '3' },
        { label: 'Доставлено', key: '4' },
        { label: 'Виконано', key: '5' },
        { label: 'Скасовано', key: '6' },
      ],
      activeName: '1',
      createdTimes: 0,
      dialogFormVisible: true,

      picker: '',
      pickerOptions: {
        firstDayOfWeek: 1
      },
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  margin: 30px;
}

.picker {
  display: flex;
  align-items: center;
  .picker_title {
    margin-right: 15px;
  }
}

.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 276px;
}
.el-table tr {
    background-color: red!important;
}

</style>
