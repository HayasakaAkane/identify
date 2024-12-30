<template>
  <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>总数</th>
        <th>口罩正常佩戴次数</th>
        <th>口罩未正常佩戴次数</th>
        <th>未佩戴口罩次数</th>
        <th>口罩佩戴率</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data1" :key="index">
        <td>{{ row.name }}</td>
        <td>{{ row.total }}</td>
        <td>{{ row.maskWornCorrectly }}</td>
        <td>{{ row.maskWornIncorrectly }}</td>
        <td>{{ row.noMask }}</td>
        <td>{{ row.wearingRate }}%</td>
      </tr>
      <tr>
        <td><strong>总计</strong></td>
        <td>{{ totalSum }}</td>
        <td>{{ maskWornCorrectlySum }}</td>
        <td>{{ maskWornIncorrectlySum }}</td>
        <td>{{ noMaskSum }}</td>
        <td>{{ totalWearingRate }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetSnapPictures } from '@/api/hat'

const loading = ref(false)
const error = ref('')

const data1 = ref([
  {
    name: '张三',
    total: 100,
    maskWornCorrectly: 85,
    maskWornIncorrectly: 10,
    noMask: 5,
    wearingRate: ((85 / 100) * 100).toFixed(2),
  },
  {
    name: '李四',
    total: 90,
    maskWornCorrectly: 70,
    maskWornIncorrectly: 15,
    noMask: 5,
    wearingRate: ((70 / 90) * 100).toFixed(2),
  },
  {
    name: '王五',
    total: 80,
    maskWornCorrectly: 60,
    maskWornIncorrectly: 15,
    noMask: 5,
    wearingRate: ((60 / 80) * 100).toFixed(2),
  },
])

const Data = ref()
const data = ref()

const fetchData = async () => {
  loading.value = true
  error.value = ''
  try {
    await GetSnapPictures(Data)
    // 假设接口返回数据为 { list: [{ name: ..., total: ..., maskWornCorrectly: ..., maskWornIncorrectly: ..., noMask: ... }] }
    // const list = response.data.list;
    // data.value = list.map((item) => ({
    //   name: item.name,
    //   total: item.total,
    //   maskWornCorrectly: item.maskWornCorrectly,
    //   maskWornIncorrectly: item.maskWornIncorrectly,
    //   noMask: item.noMask,
    //   wearingRate: ((item.maskWornCorrectly / item.total) * 100).toFixed(2),
    // }));
    // data.value=Data.data.record.map((item)=>{
    //   let array={}

    //   return array
    // })
  } catch (err) {
    error.value = '数据加载失败，请稍后重试。'
  } finally {
    loading.value = false
  }
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
