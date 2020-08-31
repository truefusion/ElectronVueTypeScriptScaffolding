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
    //console.log(this.getterTheme)
  //  this.setTheme(this.getterTheme)
  }
}

</script>

<style lang="scss" scope>
@import '~@/assets/scss/mixins.scss';
.home-view {
  height: 100%;
  background-color: var(--color-bg-primary);
  .topbar {
    @include flex-space-between;
    min-height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid var(--color-border-default);
  }
  .right-topbar {
    position: fixed;
    left: 341px;
    right: 0;
    z-index: 3;
    background: var(--color-bg-normal);
  }
  .rightbar {
    margin-left: 81px;
    height: 100%;
    background-color: var(--color-bg-primary);
  }
  .right-content {
    margin-left: 341px;
    height: 100%;
    background-color: var(--color-bg-primary);
  }
}
</style>
