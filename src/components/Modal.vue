<template>
  <div>
    <div @click="toggleModal" class="clickable-element">{{ triggerText }}</div>
    <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <!-- 模态框内容 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    triggerText: String,
    visible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style scoped>
/* Add your custom CSS styles here */
</style>
