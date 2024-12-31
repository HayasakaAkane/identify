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
