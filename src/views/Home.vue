<template>
  <div class="home">
    <Ipc />
  </div>
</template>

<script>
// @ is an alias to /src
import Ipc from '@/components/Ipc.vue'
//import { ipcRenderer } from 'electron'

export default {
  name: 'Home',
  components: {
    Ipc
  }
}
</script>
