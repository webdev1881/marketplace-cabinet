<template>
  <div class="custom-tree-container">

    <div class="block">
      <p>Категорії</p>
      <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>

          <span>
            <el-button class="control" type="text" size="mini" @click="() => append(data)">
              Додати
            </el-button>
            <el-button class="control" type="text" size="mini" @click="() => remove(node, data)">
              Видалити
            </el-button>
          </span>
          
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000;
import { fetchCategories } from '@/api/article'
export default {
  data() {
    const data = [
      {
        id: 2,
        label: 'Ноутбуки та комп’ютери',
        children: [{
          id: 5,
          label: 'Комп’ютери, неттопи, моноблоки'
        },
        {
          id: 6,
          label: 'Монітори'
        },
        {
          id: 9,
          label: 'Планшети'
        },
        ]
      }, {
        id: 3,
        label: 'Побутова техніка',
        children: [{
          id: 7,
          label: 'Вбудовувана техніка'
        }, {
          id: 8,
          label: 'Техніка для кухні'
        }]
      }];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    }
  },

  created() {
    this.getCategories()
  },

  methods: {

    async getCategories() {
      let id = await this.$route.meta.shop_id
      this.listLoading = true
      fetchCategories(this.listQuery, id).then(response => {
        let data = response.data.results
        console.log(data)
        data.map(b => {
          this.data.push({
            'label': b.name,
            'id': b.id,
            'parent': b.parent,
          })
        })
        this.listLoading = false
      })
    },


    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
          </span>
        </span>);
    }
  }
};
</script>

<style>
.el-button--text {
  padding-left: 5px;
  padding-right: 5px;
}
</style>

<style lang='scss' scoped>

.control {
  span {
    &:hover {
      padding: 0 5px;
    }
  }
  &:hover {
    color: white;
    background: #f08f25;
  }
}

.custom-tree-container {
  padding: 20px;
}

.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-tree {
  width: 55%;
}
</style>

