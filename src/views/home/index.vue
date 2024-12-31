<!--
 * @Descripttion: 
 * @version: 
 * @Date: 2021-04-20 11:06:21
 * @LastEditors: huzhushan@126.com
 * @LastEditTime: 2022-09-24 18:18:43
 * @Author: huzhushan@126.com
 * @HomePage: https://huzhushan.gitee.io/vue3-element-admin
 * @Github: https://github.com/huzhushan/vue3-element-admin
 * @Donate: https://huzhushan.gitee.io/vue3-element-admin/donate/
-->
<template>
  <div class="container">
    <div class="medium">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%;height: 100%;"
      >
        <!-- 库名称 -->
        <el-table-column
          prop="lib_name"
          label="库名称"
          width="100"
          class="el_column"
        />

        <!-- 地址 -->
        <el-table-column
          prop="person_addr"
          label="地址"
          width="180"
          class="el_column"
        />

        <!-- 年龄 -->
        <el-table-column
          prop="person_age"
          label="年龄"
          width="60"
          class="el_column"
        />

        <!-- 性别 -->
        <el-table-column
          prop="person_gender"
          label="性别"
          width="60"
          class="el_column"
        />

        <!-- 身份证号 -->
        <el-table-column
          prop="person_idcard"
          label="身份证号"
          width="180"
          class="el_column"
        />

        <!-- 姓名 -->
        <el-table-column
          prop="person_name"
          label="姓名"
          width="100"
          class="el_column"
        />

        <!-- 地库图片 -->
        <el-table-column
          prop="img"
          label="底库图片"
          width="180"
          class="el_column"
        >
          <template v-slot="scope">
            <img :src="scope.row.img" alt="底库图片" class="img_style" />
          </template>
        </el-table-column>

        <!-- 抓拍人脸 -->
        <el-table-column
          prop="snap_buf"
          label="抓拍人脸"
          width="180"
          class="el_column"
        >
          <template v-slot="scope">
            <img :src="scope.row.snap_buf" alt="抓拍人脸" class="img_style" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-row style="width: 100%; align-items: center;justify-content: center">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          layout=" prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-row>

      <!-- <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" /> -->
    </div>
    <el-scrollbar class="aside">
      <div>
        <h2 style="text-align: center;justify-content: center;">实时告警</h2>
        <div
          v-for="p in person_msg"
          :key="p.person_idcard"
          class="slide-in"
          :style="{ animationDelay: `1s` }"
          style="display: flex;background-color: rgb(58, 69, 104);margin: 5px;border-radius: 5px;"
        >
          <div class="img-container" style="width: 30%;">
            <img :src="p.img" alt="底库图片" class="img_style" />
          </div>
          <div class="img-container" style="width: 30%;">
            <img :src="p.snap_buf" alt="底库图片" class="img_style" />
          </div>
          <div class="h1_class" style="width: 40%;">
            <h1 class="font_color">姓名：{{ p.person_name }}</h1>
            <h1 class="font_color">所在库：{{ p.lib_name }}</h1>
            <h1 class="font_color">{{ p.trigger }}</h1>
          </div>
          <div class="percentage">{{ p.similarity }}%</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUpdate, onMounted, ref, watch } from 'vue'
import { GetKey } from '@/api/home'
import axios from 'axios'
import { da } from 'element-plus/es/locale'
//定义人员信息接口
interface personInt {
  lib_name: string, //库名称
  person_addr: string ,//地址
  person_age: string, //年龄
  person_gender: string, //性别
  person_idcard: string, //身份证号
  person_name: string ,//姓名
  img: string ,//地库图片
  snap_buf: string, //抓拍人脸
  snap_frame: string, //抓拍人脸场景图
  trigger: string, //触发时间
  similarity: string, //相似度
}
let personInfo: personInt
const img_url = ref(
  'https://tse1-mm.cn.bing.net/th/id/OIP-C.Dltn4kOkSEqtMAoHOQ7maQAAAA?rs=1&pid=ImgDetMain'
)
let person_msg = ref<Array<personInt>>([
  {
    lib_name: '图书馆A',
    person_addr: '北京市朝阳区',
    person_age: '28',
    person_gender: '男',
    person_idcard: '11010519900101001X',
    person_name: '张三',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆B',
    person_addr: '上海市浦东新区',
    person_age: '25',
    person_gender: '女',
    person_idcard: '31011519920101002X',
    person_name: '李四',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆C',
    person_addr: '广州市天河区',
    person_age: '32',
    person_gender: '男',
    person_idcard: '440106198801010033',
    person_name: '王五',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆D',
    person_addr: '深圳市南山区',
    person_age: '29',
    person_gender: '女',
    person_idcard: '440305198910100045',
    person_name: '赵六',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆E',
    person_addr: '杭州市西湖区',
    person_age: '35',
    person_gender: '男',
    person_idcard: '330106198410010055',
    person_name: '孙七',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆F',
    person_addr: '成都市武侯区',
    person_age: '27',
    person_gender: '女',
    person_idcard: '510107199201010066',
    person_name: '周八',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆G',
    person_addr: '武汉市武昌区',
    person_age: '30',
    person_gender: '男',
    person_idcard: '42010719900101078',
    person_name: '吴九',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆H',
    person_addr: '南京市玄武区',
    person_age: '26',
    person_gender: '女',
    person_idcard: '32010219930101009X',
    person_name: '郑十',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆I',
    person_addr: '重庆市渝中区',
    person_age: '31',
    person_gender: '男',
    person_idcard: '500103198901010011',
    person_name: '王十一',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆J',
    person_addr: '西安市雁塔区',
    person_age: '28',
    person_gender: '女',
    person_idcard: '610103199101010022',
    person_name: '冯十二',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆K',
    person_addr: '苏州市工业园区',
    person_age: '33',
    person_gender: '男',
    person_idcard: '320583198601010033',
    person_name: '陈十三',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆L',
    person_addr: '天津市和平区',
    person_age: '29',
    person_gender: '女',
    person_idcard: '120101198701010044',
    person_name: '褚十四',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆M',
    person_addr: '长沙市芙蓉区',
    person_age: '34',
    person_gender: '男',
    person_idcard: '430102198501010055',
    person_name: '卫十五',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆N',
    person_addr: '济南市历下区',
    person_age: '27',
    person_gender: '女',
    person_idcard: '370103198301010066',
    person_name: '蒋十六',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆O',
    person_addr: '青岛市市南区',
    person_age: '30',
    person_gender: '男',
    person_idcard: '370202198101010077',
    person_name: '沈十七',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆P',
    person_addr: '郑州市中原区',
    person_age: '26',
    person_gender: '女',
    person_idcard: '410102198001010008',
    person_name: '韩十八',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆Q',
    person_addr: '沈阳市和平区',
    person_age: '31',
    person_gender: '男',
    person_idcard: '210103198901010019',
    person_name: '杨十九',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
  {
    lib_name: '图书馆R',
    person_addr: '长春市朝阳区',
    person_age: '28',
    person_gender: '女',
    person_idcard: '220102198801010029',
    person_name: '朱二十',
    img: img_url.value,
    snap_buf: img_url.value,
    snap_frame: img_url.value,
    trigger: '2024-12-30 15:26:52',
    similarity: '91%',
  },
])

//绑定当前页码
let currentPage = ref(1)
//当前页展示几条数据
let pageSize = ref(6)
//暂存当前页的数据
let tableData = ref([])
//总数据条数
let total = ref(person_msg.value.length)
//websocket密钥
let key = ref()

//加载数据
onMounted(async () => {
  getPageData()
  //获取websocket密钥
  const { code, data, msg } = await GetKey()
  if (code === 0) {
    key.value = data.key
    console.log(key.value)
  }
})

let personInfo1: personInt = {
  lib_name: '图书馆B',
  person_addr: '上海市浦东新区',
  person_age: '25',
  person_gender: '女',
  person_idcard: '31011519920101002X',
  person_name: '李四',
  img: img_url.value,
  snap_buf: img_url.value,
  snap_frame: img_url.value,
  trigger: '2024-12-30 15:26:52',
  similarity: '91%',
}

// setInterval(() => {
//   person_msg.value.push(personInfo1);
//   console.log("add")
// }, 1000);

const ip = '192.168.1.101'
const port = '80'
const socket = new WebSocket(`ws://${ip}:${port}/ws/`)

socket.onopen = function(event) {
  const msg = {
    msg_id: '776',
    key: key.value,
  }
  socket.send(JSON.stringify(msg))
}
socket.onmessage = function(event) {
  // 确保 event.data 是一个对象
  const data = JSON.parse(event.data)
  console.log('receive', data.data.hasOwnProperty('face_attr'))
  // 检查 data 中是否有 face_attr 属性
  if (data.data.hasOwnProperty('face_attr')) {
    console.log('come in')
    console.log('face_attr array found. Processing...')
    // 从 event.data 中提取属性并赋值给 personInfo
    let personInfo: personInt = {
      lib_name: data.data.lib_name,
      person_addr: data.data.person_addr,
      person_age: data.data.person_age,
      person_gender: data.data.person_gender,
      person_idcard: data.data.person_idcard,
      person_name: data.data.person_name,
      img: data.data.img,
      snap_buf: data.data.snap_buf,
      snap_frame: data.data.snap_frame,
      trigger: data.data.trigger,
      similarity: data.data.similarity,
    }
    person_msg.value.unshift(personInfo)
    getPageData()
    // tableData.value.unshift(personInfo)
    console.log('拥有face属性,名称为:', personInfo.person_name)
  }
  console.log('come out')
  console.log('WebSocket message received and processed:', personInfo)
}

// socket.onclose = function(event) {
//   console.log('WebSocket is closed now.');
// };

// // 当你想要关闭连接时
// socket.close();

//获取当前页的数据
function getPageData() {
  //先把当前页面的数据清空
  tableData.value = []
  //获取当前页面的数据
  for (let i = (currentPage.value - 1) * pageSize.value; i < total.value; i++) {
    //遍历数据添加到tableData中
    tableData.value.push(person_msg.value[i])
    // console.log(msg.value[i])
    // console.log(tableData.value[i])
    //判断是否达到一页的要求
    if (tableData.value.length == pageSize.value) break
  }
}

//调整当前页的页码
const handleCurrentChange = (val: number) => {
  //修改当前页的页码
  currentPage.value = val
  //数据重新分页
  getPageData()
  console.log(`current page: ${val}`)
}
</script>

<style>
.el_pagination {
  position: absolute;
  left: 50%;
  /* 与容器底部保持一定距离，避免紧贴边缘 */
  transform: translateX(-50%);
  /* 水平居中 */
  width: 100%;
  /* 使分页器宽度与容器一致 */
  background-color: #fff;
  /* 根据需要设置背景颜色 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  /* 可选的底部阴影效果 */
  z-index: 1000;
  /* 确保分页器在最上层 */
  padding: 10px 0;
  /* 根据需要调整内边距 */
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  /* 设置为 flex 布局 */
}

.medium {
  position: relative;
  width: 70%;
  min-height: 300px;
  /* 设置一个最小高度，确保容器有足够的空间显示内容和分页器 */
  background-color: antiquewhite;
}

.aside {
  width: 30%;
  height: 100%;
  background-color: rgb(29, 35, 65);
}

.img_style {
  height: auto;
  width: 80px;
  display: block;
}

.el_column {
  text-align: center;
}

.font_color {
  color: #fff;
  font-size: small;
}

/* 动画效果 */
@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.5s ease forwards;
}

.img-container {
  display: flex;
  /* 启用 Flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  overflow: hidden;
  /* 防止图片超出容器 */
  border: 1px solid #606468;
  margin: 10px;
}

.h1_class {
  display: flex;
  /* 启用 Flexbox 布局 */
  flex-direction: column;
  /* 使子元素垂直排列 */
  justify-content: center;
  /* 垂直居中 */
}

.percentage {
  width: 50px; /* 根据需要调整宽度 */
  height: 30px; /* 根据需要调整高度 */
  background-color: #4caf50; /* 绿色背景 */
  color: white; /* 白色文本 */
  border-radius: 10%; /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 根据需要调整字体大小 */
}
</style>
