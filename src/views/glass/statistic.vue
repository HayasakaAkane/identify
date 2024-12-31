<template>
  <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>总数</th>
        <th>佩戴透明眼镜</th>
        <th>佩戴普通眼镜</th>
        <th>佩戴太阳镜</th>
        <th>未佩戴</th>
        <th>眼镜佩戴率</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td>{{ row.name }}</td>
        <td>{{ row.stats.totalRespirators }}</td>
        <td>{{ row.stats.transparent_glasses }}</td>
        <td>{{ row.stats.st_ordinary_glasses }}</td>
        <td>{{ row.stats.sunglasses }}</td>
        <td>{{ row.stats.glasses_style_type_none }}</td>
        <td>{{ row.stats.fullAndNoseRatio }}%</td>
      </tr>
      <tr>
        <td><strong>总计</strong></td>
        <td>
          {{
            total_glasses_style_type_none +
              total_transparent_glasses +
              total_sunglasses +
              total_st_ordinary_glasses
          }}
        </td>
        <td>{{ total_transparent_glasses }}</td>
        <td>{{ total_glasses_style_type_none }}</td>
        <td>{{ total_sunglasses }}</td>
        <td>{{ total_st_ordinary_glasses }}</td>
        <td>
          {{
            ((total_transparent_glasses +
              total_sunglasses +
              total_st_ordinary_glasses) /
              (total_glasses_style_type_none +
                total_transparent_glasses +
                total_sunglasses +
                total_st_ordinary_glasses)) *
              100
          }}%
        </td>
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

let total_glasses_style_type_none = 0
let total_transparent_glasses = 0
let total_sunglasses = 0
let total_st_ordinary_glasses = 0

function dealdata(data) {
  const group = {}
  data.value.forEach(item => {
    const groupKey = item.person_name // 使用 item 中的 name 字段作为分组键
    if (!group[groupKey]) {
      group[groupKey] = [] // 如果没有该组，初始化为一个数组
    }
    group[groupKey].push(item) // 将当前数据添加到对应组
  })

  const treeData = Object.keys(group).map(name => {
    const groupItems = group[name]

    // 统计 st_respirator 的三种情况的数量
    let glasses_style_type_none = 0
    let transparent_glasses = 0
    let sunglasses = 0
    let st_ordinary_glasses = 0

    groupItems.forEach(item => {
      if (item.face_attr.glass_style === 'glasses_style_type_none') {
        glasses_style_type_none++
        total_glasses_style_type_none++
      } else if (item.face_attr.glass_style === 'transparent_glasses') {
        transparent_glasses++
        total_transparent_glasses++
      } else if (item.face_attr.glass_style === 'sunglasses') {
        sunglasses++
        total_sunglasses++
      } else if (item.face_attr.glass_style === 'st_ordinary_glasses') {
        st_ordinary_glasses++
        total_st_ordinary_glasses++
      }
    })

    // 计算 st_respirator_full 和 st_respirator_nose 的占比
    const totalRespirators =
      transparent_glasses +
      sunglasses +
      st_ordinary_glasses +
      glasses_style_type_none
    const fullAndNoseRatio =
      totalRespirators > 0
        ? ((transparent_glasses + sunglasses + st_ordinary_glasses) /
            totalRespirators) *
          100
        : 0
    return {
      name, // 分组名称
      children: groupItems, // 当前组的数据
      stats: {
        totalRespirators, // 总和
        transparent_glasses,
        sunglasses,
        st_ordinary_glasses,
        glasses_style_type_none,
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
