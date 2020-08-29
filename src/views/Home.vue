<template>
  <div class="home">
    <Ipc @setTheme="setTheme" />
  </div>
</template>

<script lang="ts">

// @ is an alias to /src

import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Ipc from '@/components/Ipc.vue'

@Component({
  components: {
    Ipc,
  },
})


export default class Home extends Vue {
  @Getter('currentTheme') private getterTheme!: Theme

  private setTheme(currentTheme: Theme): void {
    const bodyTag: HTMLBodyElement | null = document.querySelector('body')
    if (!bodyTag) {
      return
    }
    bodyTag.className = currentTheme
  }

  private created() {
    this.setTheme(this.getterTheme)
  }
}


//export default {
//  name: 'Home',
//  components: {
//    Ipc
//  }
//}
</script>
