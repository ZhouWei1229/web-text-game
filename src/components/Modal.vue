<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <transition name="modal-fade" appear>
      <div
        v-if="visible"
        class="modal"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <div class="modal-content">
          <h2>{{ title }}</h2>
          <slot></slot>
          <!-- 直接插入内容 -->
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  props: {
    title: String,
  },
  methods: {
    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.style.transition = "opacity 0.5s";
      el.style.opacity = 1;
      el.addEventListener("transitionend", done);
    },
    leave(el, done) {
      el.style.transition = "opacity 0.5s";
      el.style.opacity = 0;
      el.addEventListener("transitionend", done);
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

button {
  margin-top: 10px;
}

.modal-fade-enter-active,
.modal-fade-leave-active,
.modal-fade-appear-active {
  transition: opacity 0.3s;
}

.modal-fade-enter,
.modal-fade-leave-to,
.modal-fade-appear {
  opacity: 0;
}

.modal-fade-enter,
.modal-fade-appear-to {
  opacity: 1;
}
</style>
