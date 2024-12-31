<template>
  <div class="user-header">
    <!-- 在这里添加你的代码 -->
    <!-- <el-button type="primary">新增</el-button> -->
    <!-- <el-form :inline="true" :model="formInline"> -->
    <!-- <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="formInline.keyWord"></el-input>
            </el-form-item> -->

    <!-- <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form> -->
  </div>
  <div class="table">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :width="item.width ? item.width : 125"
        :prop="item.prop"
        :label="item.label"
      >
        <template v-if="item.prop === 'photo'" #default="{ row }">
          <!-- <img :src="`/api/ws/${row.img_path}`" alt="照片" style="width: 50px; height: auto;" /> -->

          <!-- <img src="/api/ws/facebase/libid6/2024/12/23/v214_1734918866_5_0.jpg" alt="照片"
                        style="width: 50px; height: auto;" /> -->
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default>
                    <el-button type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button type="primary" size="small">删除</el-button>
                </template>
</el-table-column> -->
    </el-table>
    <el-pagination
      class="pager"
      background
      layout="prev, pager, next"
      size="small"
      :total="config.total"
      @current-change="handleChange"
      :page-size="config.pageSize"
    />
  </div>
</template>

<script>
export default {
  name: 'GlassAllarm',
  // 在这里添加你的代码
}
</script>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { GetAllAvatar } from '@/api/glass'
import { useAuthStore } from '@/pinia/modules/session'
import axios from 'axios'
const authStore = useAuthStore()

const tableData = ref([])

const { proxy } = getCurrentInstance()

const config = reactive({ name: '', total: 0, page: 1, pageSize: 10 })
const getAllarmData = async () => {
  const { code, data, msg } = await GetAllAvatar(authStore.sessionid)
  if (code === 0) {
    // tableData.value = data.record
    tableData.value = data.record.map(item => ({
      ...item,
      gender: item.person_gender === '1' ? '男' : '女',
      glass_style:
        item.face_attr.glass_style === 'transparent_glasses'
          ? '透明眼镜'
          : '其他眼镜',
    }))

    config.total = data.result_num
    const page = config.page
    const limit = config.pageSize

    const pageList = tableData.value.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1)
    ) // config.total =
    tableData.value = pageList
  }
}

const tableLabel = reactive([
  // {
  //     prop: 'photo',
  //     label: '照片'
  // },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'person_name',
    label: '姓名',
  },
  {
    prop: 'similarity',
    label: '相似度',
  },

  {
    prop: 'person_age',
    label: '年龄',
  },
  {
    prop: 'glass_style',
    label: '眼镜',
  },
  {
    prop: 'lib_name',
    label: '人像库名称',
    width: 200,
  },
  {
    prop: 'trigger',
    label: '抓拍时间',
    width: 400,
  },
])

// const formInline = reactive({
//     keyWord: ''
// })
// const handleChange = (page) => {
//     config.page = page
//     // getAllarmData()
// }
// const handleSearch = () => {
//     config.name = formInline.keyWord
//     // getUserData()
// }
onMounted(async () => {
  getAllarmData()

  // getAllarmData()
  // console.log('请求');
  // axios.get('/api/ws/facebase/libid6/2024/12/23/v214_1734918866_5_0.jpg')
})

const handleChange = page => {
  config.page = page
  getAllarmData()
}
</script>

<style scoped>
/* 在这里添加你的样式 */

.user-header {
  display: flex;
  justify-content: space-between;
}

.table {
  position: relative;
  height: 520px;

  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .el-table {
    width: 100%;
    height: 500px;
  }
}

.select-clearn {
  display: flex;
}
</style>
