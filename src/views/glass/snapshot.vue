<script setup>
import { ref, onMounted, computed } from 'vue'
import { GetAllAvatar } from '@/api/glass'
import { useAuthStore } from '@/pinia/modules/session'

// 存储从API获取的数据
const tableData = ref([])
// 存储总条目数
const total = ref(0) // 默认值为0，实际应用中应从API获取
// 每页显示条数的选项
const pageSizes = [15, 16, 20, 25]
// 当前每页显示条数
const pageSize = ref(15)
// 当前页码
const currentPage = ref(1)

// 从API获取数据
const fetchData = async () => {
  console.log("213123123")
  try {
    const authStore = useAuthStore()
    const response = await GetAllAvatar(
      authStore.sessionid,
      (currentPage.value - 1) * pageSize.value + 1,
      pageSize.value
    )
    console.log('API Response:', response) // 添加日志查看API响应
    if (response.code === 0) {
      const items = response.data.record.map(item => ({
        imageUrl: '/' + item.snap_path,
        gender: item.face_attr.gender_code === 'male' ? '男' : '女',
        age: Math.floor(item.face_attr.st_age_value),
        glassStatus:
          item.face_attr.glass_style === 'glasses_style_type_none'
            ? '没戴眼镜'
            : '戴了眼镜',
        faceLibrary: item.lib_name,
        libraryType: item.lib_type === 1 ? '黑名单' : '白名单',

        captureTime: item.trigger,
      }))
      tableData.value = items
      total.value = response.data.total_num
      console.log('Table Data:', tableData.value) // 添加日志查看表格数据
    } else {
      console.error('我没有拿到数据?')
    }
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 组件加载时获取数据
onMounted(fetchData)

// 分页数据计算属性
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return tableData.value.slice(start, end)
})

// 处理分页变化
const handleCurrentChange = async newPage => {
  currentPage.value = newPage
  await fetchData()
}

// 处理每页条数变化
const handlePageSizeChange = async newSize => {
  pageSize.value = newSize
  currentPage.value = 1 // 重置为第一页
  await fetchData()
}
</script>

<template>
  <div class="container">
    <el-table :data="tableData" class="sticky-header">
      <!-- 表格列定义 -->
      <el-table-column fixed prop="imageUrl" label="照片" width="150">
        <template #default="scope">
          <div class="photo-cell">
            <img :src="scope.row.photo" alt="照片" class="photo-img" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="150"></el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column
        prop="glassStatus"
        label="眼镜"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="faceLibrary"
        label="人像库名称"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="libraryType"
        label="人像库类型"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="captureTime"
        label="抓拍时间"
        width="200"
      ></el-table-column>
    </el-table>
  </div>
  <div class="pagination-container">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      v-model:current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handlePageSizeChange"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sticky-header {
  display: block;
  width: 100%;
  margin-bottom: 20px;
}

.photo-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>