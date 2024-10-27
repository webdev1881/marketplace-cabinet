<template>

  <div class="tab">

    <el-table 
      @row-click="handleRowClick" 
      @sort-change="sortChange" 
      :data="list" 
      border 
      fit highlight-current-row 
      style="width: 100%" 
    >


      <el-table-column prop="id" sortable="custom"  :class-name="getSortClass('id')" v-loading="loading" align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="Дата">
        <template slot-scope="scope">
          <span>{{  scope.row.created_at | orderDate  }}</span>
        </template>
      </el-table-column>
  
      <el-table-column min-width="300px" label="Товари">
        <template slot-scope="{row}">
          <div v-for="item in row.details" :key="item.id" >{{ item.product.name }}</div>
        </template>
      </el-table-column>



      <el-table-column v-loading="loading" align="center" label="Інформація" width="110">
        <template slot-scope="{row,$index}">
          <el-button :disabled="false"  type="success" plain size="mini" @click="handleUpdate(row)"> Детально </el-button>
        </template>
      </el-table-column>




      <el-table-column label="Змінити статус" align="center" width="230px" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">

          <el-button :disabled="false" type="primary" size="mini" @click="handleUpdate(row)">
            В обробку
          </el-button>

          <el-button :disabled="false" size="mini" type="danger" @click="handleDelete(row, $index)">
            Скасувати
          </el-button>

        </template>
      </el-table-column>


      <el-table-column width="100px" align="center" label="Менеджер">
        <template slot-scope="scope">
          <span>{{ scope.row.status_display }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="Сума, грн.">
        <template slot-scope="scope">
          <span>{{ scope.row.total | splitNumber }}</span>
        </template>
      </el-table-column>
      
    </el-table>
    

    <!-- DETAILS -->
    <el-dialog :top="'5vh'" :width="'90%'" class="detail" :title="'Замовлення № ' +  detail.id" :visible.sync="dialogFormVisible">
      <div class="detail_wrap">

        <div class="total">
          <h3 class="title">Разом</h3>
          <div class="qty">
            <div class="left">3 товара</div>
            <div class="right"> {{ detail.total | splitNumber }} грн. </div>
          </div>
          <div class="discount">
            <div class="left">Знижка</div>
            <div class="right"> <a href="" class="add">Додати</a></div>
          </div>
          <hr class="line">
          <div class="totl">
            <div class="left">Всього до сплати <pre> </pre> </div>
            <div class="right"> {{ detail.total | splitNumber }} грн. </div>
          </div>
        </div>

        <div class="client">
          <h3 class="title">Клієнт</h3>
          <h4 class="fio"> {{ detail.buyer_first_name }} {{ detail.buyer_last_name }} </h4>
          <div class="orders"> 3 замовлення на суму {{ detail.total | splitNumber }} грн. </div>
          <div class="discount_с">
            <div class="left">Знижка {{ ' 0 грн.' }} </div>
          </div>
          <div class="mail_c">
            <i class="el-icon-user-solid"></i>
            <div class="email_c"> {{ detail.receiver_email }} </div>
          </div>
          <div class="phone_c">
            <i class="el-icon-mobile-phone"></i>
            <div class="ephone_c"> {{ detail.receiver_phone }} </div>
          </div>
          <div class="call"> <a href="" class="add">Відгуки</a></div>
        </div>

        <div class="deliv">

          <div class="deliv_edit">Редагувати</div>

          <h3 class="title">Доставка</h3>
          <div class="deliv_type">
            <i class="el-icon-truck deliv_icon"></i>
            <div class="deliv_text"> {{ 'Самовивіз' }} <span class="free"> (безкоштовно) </span> </div>
          </div>
          <div class="buyer">
            <div class="byer_l">
              <div class="name">Отримувач</div>
              <div class="mob">Телефон отримувача</div>
              <div class="val">Вартість доставки</div>
            </div>

            <div class="byer_r">
              <div class="name_v"> {{ detail.buyer_first_name }} </div>
              <div class="mob_v"> {{ detail.receiver_phone }} </div>
              <div class="val_v"> {{ 'Безкоштовно' }} </div>
            </div>
          </div>
        </div>

        <div class="pay">
          <h3 class="title">Оплата</h3>
          <div class="pay_type">
            <i class="el-icon-bank-card pay_icon"></i>
            <div class="pay_type_icon_val"> Накладений платіж </div>
          </div>
        </div>

      </div>

          <!-- products -->
      <div class="products">
        <div v-for="item in detail.details" :key="item.id" class="detail_item">

          <img :src="item.product.image" alt="" class="det_img">

          <div class="det_info">
            <div class="product"> {{ item.product.name }} </div>
            <div class="price"> Ціна: {{ item.product.price }} </div>
            <div class="stock">  В наявності </div>
          </div>

          <div class="det_qty">
            <input v-model="item.qty" class="qty_val">
            <div class="qty_text">шт.</div>
          </div>

          <div class="total_item">
            <div class="total_val"> {{ (item.qty * item.product.price) | splitNumber }} </div>
            <div class="total_text"> {{'грн.'}} </div>
          </div>

          <div class="det_control">
            <i class="el-icon-view eye"></i>
            <i class="el-icon-close close"></i>
          </div>

        </div>
      </div>

    </el-dialog>


    <pagination
      v-show="total > 0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.page_size"
      @pagination="getList" 
    />


  </div>

</template>

<script>
import { fetchList } from '@/api/article'
import { fetchOrders } from '@/api/article'
import Pagination from '@/components/Pagination'
import orders from '@/api/my/orders.json'

export default {
  name: 'tab',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'Новий'
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        page_size: null,
        status_display: this.type,
        sort: '-id'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      loading: false,
      dialogFormVisible: false,
      detail: {},
    }
  },

  created() {
    this.getList()
  },
  methods: {
    handleRowClick(row) {
      this.handleUpdate(row)
    },
    getList() {
      this.loading = true
      this.$emit('create') // test
      this.list = orders.results.filter(el => this.type == el.status)

      // fetchOrders(this.listQuery).then(response => {
      //   // console.log( response );
      //   this.total = response.data.count
      //   this.list = response.data.results
      //   this.loading = false
      // })
    },

    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
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

    handleUpdate(row) {
      // console.log( row )
      this.detail = row
      this.dialogFormVisible = true
    },

  }
}
</script>

<style lang="scss" scoded>

.detail_wrap {
  display: flex;
  .total, .client, .deliv, .pay {
    width: 25%;
    margin: 10px;
    padding: 10px;
    border: 1px #efeeee solid;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}


.total, .client {
  .qty, .discount, .totl{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .line {
    border: 1px solid #efeeee;
  }
}

.totl {
  margin-top: 15px;
}
.add {
  color: #F38F00;
  &:hover {
    color: #ebac54;
  }
}
.fio {
  color: #ebac54;
}

.discount_с {
  display: flex;
}
.orders {
  margin-bottom: 10px;
}
.mail_c {
  margin-top: 10px;
  display: flex;
  .email_c {
    margin-left: 10px;
  }
}
.phone_c {
  margin-top: 10px;
  display: flex;
  .ephone_c {
    margin-left: 10px;
  }
}
.call {
  margin-top: 10px;
}

.deliv {
}
.deliv_type {
  margin-bottom: 10px;
  display: flex;
}
.deliv_text {
  margin-left: 5px;
}
.free {
  margin-left: 2px;
  color: green;
}
.deliv_icon {
  font-size: 17px;
  margin-top: -1px;
}
.name, .mob, .val, .name_v, .mob_v, .val_v {
  margin-bottom: 5px;
}
.buyer {
  display: flex;
}
.byer_l {
  margin-right: 10px;
}

.pay_type {
  display: flex;
  .pay_icon {
    margin-right: 10px;
    font-size: 17px;
  }
}

.total, .client, .deliv, .pay {
  position: relative;
}
.deliv_edit {
  position: absolute;
  text-decoration: underline;
  font-size: 11px;
  top: 30px;
  right: 15px;
  color: #24bbd0;
}


.el-dialog__body {
  padding-top: 0px;
}



.detail_item {
  margin: 20px 10px;
  display: flex;
  // min-width: 35%;
  .det_img {
    // height: 70px;
    width: 80px;
  }
  .det_info {
    min-width: 35%;
    margin-left: 20px;
    font-size: 12px;
    .product {
      margin-bottom: 5px;
      font-weight: 600;
    }
    .price {
      margin-bottom: 5px;
    }
    .stock {
      color: #cbcccb;
    }
  }
}


.det_qty {
  display: flex;
  align-items: center;
  min-width: 20%;
  .qty_val {
    height: 28px;
    width: 38px;
    margin-right: 10px;
    text-align: center;
    &:focus {
      // border-color: #ebac54;
      border: 2px solid #ebac54;
      // box-shadow: none;
      outline: none;
    }
  }
}


.total_item {
  display: flex;
  align-items: center;
  min-width: 200px;
  .total_val {
    margin-right: 5px;
  }
}

.det_control {
  // width: 200px;
  display: flex;
  align-items: center;
  // flex-direction: row-reverse;
  .eye, .close {
    font-size: 18px;
    margin-right: 10px;
    cursor: pointer;
  }
}



.el-table__row {
  // background-color: red!important;
  cursor: pointer;
}











</style>

