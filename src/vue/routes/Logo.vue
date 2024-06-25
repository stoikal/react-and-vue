<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import bouncingLogo from '@/shared/bouncingLogo';
import vueLogo from '@/assets/vue.svg'

const position = ref(null)
const fieldEl = ref(null)

const vueSubscriber = ({ arena, ...logo}) => {
  const field = fieldEl.value?.getBoundingClientRect() || {}

  const pos = {
    ...logo,
    left: logo.left - field.left,
    top: logo.top - field.top
  }

  // console.log(position.left)

  position.value = pos
}

onMounted(() => {
  console.log("mounted")
  bouncingLogo.subscribe(vueSubscriber)
  bouncingLogo.start()
})

onUnmounted(() => {
  bouncingLogo.unsubscribe(vueSubscriber)
  bouncingLogo.stop()
})


const ballStyle = computed(() => ({
  position: "absolute",
  top: `${position.value?.top}px`,
  left: `${position.value?.left}px`,
  width: `${position.value?.width}px`,
  height: `${position.value?.height}px`,
  borderRadius: '50%',
  display: "grid",
  placeItems: "center"
}))
</script>

<template>
  <div
    ref="fieldEl"
    :style='{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: -1,
    }'
  >
    
    <div
      v-if="position"
      :style='ballStyle'
    >
      <img
        :src="vueLogo"
        style="width: 100%;"
      />
    </div>
  </div>
</template>