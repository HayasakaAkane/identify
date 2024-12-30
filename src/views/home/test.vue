<template>
  test
  <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
  <div>{{ res }}</div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { GetAllAvatar } from '@/api/test'
import { useAuthStore } from '@/pinia/modules/session'

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    const res = ref([])

    onMounted(async () => {
      const { code, data, msg } = await GetAllAvatar(authStore.sessionid)
      if (code === 0) {
        console.log(code, data, msg)
        res.value = data
      }
    })

    return { res }
  },
})
</script>
