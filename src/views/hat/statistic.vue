<template>
  <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>总数</th>
        <th>帽子正常佩戴次数</th>
        <th>未佩戴帽子次数</th>
        <th>帽子佩戴率</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td>{{ row.name }}</td>
        <td>{{ row.stats.totalRespirators }}</td>
        <td>{{ row.stats.cap }}</td>
        <td>{{ row.stats.hat_style_type_none }}</td>
        <td>{{ row.stats.fullAndNoseRatio }}%</td>
      </tr>
      <tr>
        <td><strong>总计</strong></td>
        <td>{{ totalcap + totalNone }}</td>
        <td>{{ totalcap }}</td>
        <td>{{ totalNone }}</td>
        <td>{{ (totalcap / (totalcap + totalNone)) * 100 }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup="js">
import { ref, onMounted } from 'vue'
import { GetSnapPictures } from '@/api/hat'

const loading = ref(false)
const error = ref('')

const data = ref([])

const Data = ref()
const record = ref()

const fetchData = async () => {
  loading.value = true
  error.value = ''
  try {
    Data.value = await GetSnapPictures()

    record.value = Data.value.data.record
    console.log('----------------------------------')
    console.log(record)
    data.value = dealdata(record)
  } catch (err) {
    error.value = '数据加载失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}

let totalNone = 0
let totalcap = 0

function dealdata(data) {
  const group = {}
  data.value.forEach(item => {
    const groupKey = item.person_name // 使用 item 中的 name 字段作为分组键

    if (!group[groupKey]) {
      group[groupKey] = [] // 如果没有该组，初始化为一个数组
    }
    group[groupKey].push(item) // 将当前数据添加到对应组
  })
  console.log('----------------------------------')

  console.log(group)

  const treeData = Object.keys(group).map(name => {
    const groupItems = group[name]

    // 统计 st_respirator 的三种情况的数量
    let hat_style_type_none = 0
    let cap = 0

    groupItems.forEach(item => {
      if (item.face_attr.cap_style === 'hat_style_type_none') {
        totalNone++
        hat_style_type_none++
      } else if (item.face_attr.cap_style === 'cap') {
        cap++
        totalcap++
      }
    })

    // 计算 st_respirator_full 和 st_respirator_nose 的占比
    const totalRespirators = hat_style_type_none + cap
    const fullAndNoseRatio =
      totalRespirators > 0 ? (cap / totalRespirators) * 100 : 0
    return {
      name, // 分组名称
      children: groupItems, // 当前组的数据
      stats: {
        totalRespirators, // 总和
        hat_style_type_none,
        cap,
        fullAndNoseRatio,
      },
    }
  })
  console.log(treeData)
  return treeData
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-family: Arial, sans-serif;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>
