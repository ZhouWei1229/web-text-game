<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <el-button type="primary" round>選單</el-button>
      </div>
      <div class="right">
        <el-button type="primary" round>設定</el-button>
      </div>
    </div>
    <div class="content">
      <div class="description-box">
        <!-- Your text description goes here -->
        This is some text description.
      </div>
    </div>
    <div class="btn-content">
      <div class="A">
        <el-button type="primary" round>A</el-button>
      </div>
      <div class="B">
        <el-button type="primary" round>B</el-button>
      </div>
      <div class="C">
        <el-button type="primary" round>C</el-button>
      </div>
      <div class="D">
        <el-button type="primary" round>D</el-button>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li v-for="(value, ability) in characterAbilities" :key="ability">
          <span class="ability-name">{{ ability }}:</span>
          <span class="ability-value">{{ value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  // 添加组件逻辑
  computed: {
    // 使用 mapState 辅助函数来获取 characterAbilities 数据
    ...mapState(["characterAbilities"]),
  },
  methods: {
    // 使用 mapMutations 辅助函数来调用 mutations 更新 characterAbilities 数据
    ...mapMutations(["updateAbility"]),

    simulateEvent() {
      // 在此处触发 mutation 更新数据
      const newAbilities = {
        ...this.characterAbilities,
        Intelligence: this.characterAbilities.Intelligence + 10,
        Stamina: this.characterAbilities.Stamina - 5,
      };

      // 更新数据并限制上限为100
      this.updateAbility(newAbilities);

      // 其他事件处理逻辑
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Helvetica Neue", sans-serif;
  padding: 20px;
  background-color: $--color-primary; /* 使用 Element UI 主色 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: $--color-primary; /* 使用 Element UI 主色 */
  border-radius: 5px;
}

.content {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}

.description-box {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 18px;
}

.btn-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.A,
.B,
.C,
.D {
  flex: 1;
  margin-right: 10px;
}

button {
  width: 100%;
}

.footer {
  margin-top: 20px;
}

ul {
  color: #085182;
}

.ability-name {
  font-weight: bold;
  font-size: 16px;
  color: #007acc; /* 与头部颜色相匹配 */
}

.ability-value {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #085182; /* 与头部颜色相匹配 */
}

/* Add more styles as needed */
</style>
