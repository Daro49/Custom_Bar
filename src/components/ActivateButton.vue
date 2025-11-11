<template>
  <button
    :class="['button', isActive ? 'activated' : 'deactivated']"
    @click="toggle"
    :aria-pressed="isActive"
  >
    <div class="img-wrap">
      <div class="btn-image" aria-hidden="true"></div>
      <span class="btn-text">{{ txt }}</span>
    </div>
  </button>
</template>

<script>
import { ref, computed } from 'vue'
import { addPoints } from '@/stores/AddPoints.js'
import { activeUser } from '@/stores/Login';

export default {
  name: 'ActivateButton',
  props: {
    activation_points: { type: [String, Number], default: null },
  },
  setup(props) {
    const isActive = ref(false)
    const txt = computed(() =>
      isActive.value ? 'Activated' : `Activate for ${props.activation_points}`,
    )
    async function toggle() {
      if (!isActive.value) {
        if (props.activation_points <= activeUser.value.points) {
          const success = await addPoints(-props.activation_points)
          if (!success) return
          isActive.value = true
        } else {
          return
        }
      } else {
        const success = await addPoints(props.activation_points)
        if (!success) return
        isActive.value = false
      }
    }
    return { isActive, txt, toggle }
  },
}
</script>

<style>
.button {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  text-align: center;
}

.img-wrap {
  position: relative;
  display: block;
  width: 100%;
}

.btn-image {
  width: 100%;
  height: 44px;
  border-radius: 6px;
  box-sizing: border-box;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    opacity 0.12s ease;
  border: 2px solid #000;
}

.btn-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}

.button.activated .btn-image {
  background: linear-gradient(180deg, #045209 0%, #03800e 100%);
}

.button.deactivated .btn-image {
  background: linear-gradient(180deg, #6d6d6d 0%, #242424 100%);
}
</style>
