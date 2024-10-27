<template>
  <div class="components-container board">

    <!-- <input type="file" class="select" @change="onfileSelect"> -->

    <!-- <el-button type="file" class="load" size="small" @change="onfileSelect">Загрузить изображение</el-button> -->


    <div class="img">
      <input @change="onfileSelect" type="file" id="upload" hidden/>
      <label for="upload" class="select">Загрузить изображение</label>
      <span class="tip">Файл jpg / png. Размер не более 500Кб</span>

      <div v-for=" item in imgList " :key="item" class="item">
        <img :src="item.url" alt="" class="item_image">
        <div class="item_name"> {{ item.name }} </div>
        <button id='close'>close</button>
      </div>

      <!-- <div class="item">
        <img src="@/assets/media/product11.jpg" alt="" class="item_image">
        <div class="item_name"> product_45214_7777777 777777777 7777777777777.jpg </div>
        <div class="outer"><div class="inner"><label>Удалить</label></div></div>
      </div> -->



    </div>

    <div class="video">
      <input @change="onfileSelect" type="file" id="upload" hidden/>
      <label for="upload" class="select">Загрузить видео</label>
      <span class="tip">Файл avi, mp4</span>
    </div>




    <!-- <el-upload
      class="upload-demo-img"
      :action="addimg"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="imgList"
      list-type="picture">
      <el-button size="small" type="primary">Загрузить картинку</el-button>
      <div slot="tip" class="el-upload__tip">jpg / png файл. Размер не более 500kb</div>
    </el-upload>

    <el-upload
      class="upload-demo-video"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="videoList"
      list-type="picture">
      <el-button size="small" type="primary">Загрузить видео</el-button>
      <div slot="tip" class="el-upload__tip">Файл avi, mp4</div>
    </el-upload> -->



    <!-- <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Бытовая техника" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Умный дом" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Разное" /> -->
  </div>
</template>


<script>
import Kanban from '@/components/Kanban'

import {uploadImg, fetchImg } from '@/api/media'

export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      selectedFile: null,
      list1: [
        { name: 'Sony', id: 1 },
        { name: 'SANYO', id: 2 },
        { name: 'Electrolux', id: 3 },
        { name: 'Voxtel', id: 4 }
      ],
      list2: [
        { name: 'DeLonghi', id: 1 },
        { name: 'Vitek', id: 2 },
        { name: 'Huawei', id: 3 },
        { name: 'BBK', id: 4 }
      ],
      list3: [
        { name: 'Moulinex', id: 1 },
        { name: 'Rowenta', id: 2 },
        { name: 'Siemens', id: 3 },
        { name: 'Sennheiser', id: 4 }
      ],
      imgList: [

      ],
      videoList: [

      ],
    }
  },
  methods: {
    addimg(e) {
      console.log( e )
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      // console.log( file )
      // console.log( fileList )
    },

    async onfileSelect(e) {
      console.log( e )
      this.selectedFile = await e.target.files[0]
      uploadImg( this.selectedFile, 1 )
        .then( res=> {
          console.log( res )
        } )
    },

    getImg() {
      fetchImg()
    }




  },
  created() {
    this.getList()
    this.getBrands()
    this.getCategories()
    this.requ()

    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
}
</script>




<style lang="scss">
.board {
  width: 1000px;
  padding: 25px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}

.upload-demo-img, .upload-demo-video {
  width: 50%;
  margin-right: 25px;
}

.select {
  background-color: #304156;
  color: white;
  display: inline-block;
  padding: 0.5rem;
  font-weight: 400;
  font-size: 15px;
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


.img, .video {
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
  .item_image {
    width: 90px;
    height: 90px;
    margin-right: 25px;
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
    width: 2em; height: 2em;
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
    
    &:before, &:after {
      position: absolute;
      top: 15%; left: calc(50% - .0625em);
      width: .125em; height: 70%;
      border-radius: .125em;
      transform: rotate(45deg);
      background: currentcolor;
      content: ''
    }
    
    &:after { transform: rotate(-45deg); }
  }



// .outer {
//   position: absolute;
//   margin: auto;
//   width: 30px;
//   cursor: pointer;
//   top: 45px;
//   right: 25px;
//   label { 
//     font-size: 12px; 
//     line-height: 2px;
//     color: #d66f6b;
//     transition: all .1s ease-in;
//     opacity: 0;
//     cursor: pointer;
//   }
// }

// .inner {
//   width: inherit;
//   text-align: center;
// }



// .inner:before, .inner:after {
//   position: absolute;
//   content: '';
//   height: 1px;
//   width: inherit;
//   background: #304156;
//   left: 0;
//   transition: all .1s ease-in;
// }

// .inner:before {
//   top: 50%; 
//   transform: rotate(45deg);  
// }

// .inner:after {  
//   bottom: 50%;
//   transform: rotate(-45deg);  
// }

// .outer:hover label {
//   opacity: 1;
// }

// .outer:hover .inner:before,
// .outer:hover .inner:after {
//   transform: rotate(0);
// }

// .outer:hover .inner:before {
//   top: 0;
// }

// .outer:hover .inner:after {
//   bottom: 0;
// }






</style>

