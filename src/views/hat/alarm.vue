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
      />

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
import { GetHatAllarm } from '@/api/hat'
import { useAuthStore } from '@/pinia/modules/session'

const authStore = useAuthStore()
const res = ref([])

const tableData = ref([])

const { proxy } = getCurrentInstance()

const config = reactive({ name: '', total: 0, page: 1, pageSize: 15 })
const getAllarmData = async () => {
  const { code, data, msg } = await GetHatAllarm(authStore.sessionid)
  if (code === 0) {
    // tableData.value = data.record
    tableData.value = data.record.map(item => ({
      ...item,
      gender: item.person_gender === '1' ? '男' : '女',
      cap_style:
        item.face_attr.cap_style === 'hat_style_type_none'
          ? '未戴帽子'
          : '戴帽子',
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
    prop: 'cap_style',
    label: '是否戴帽子',
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
  height: 100%;

  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }

  .el-table {
    width: 100%;
    height: 100%;
  }
}

.select-clearn {
  display: flex;
}
</style>
