<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <el-button type="primary" round class="menu-button">{{
          buttonText.menu
        }}</el-button>
      </div>
      <div class="right">
        <el-button type="primary" round class="settings-button">{{
          buttonText.settings
        }}</el-button>
      </div>
    </div>

    <div class="content">
      <div class="description-box">
        {{ descriptionText }}
      </div>
    </div>

    <div class="footer">
      <div v-for="(value, ability) in characterAbilities" :key="ability">
        <div class="ability">
          <span class="ability-name">{{ abilityText[ability] }}:</span>
          <span class="ability-value">{{ value }}</span>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <div class="button-group-item">
        <el-button type="primary" @click="showModal('NationalAffairs')">
          {{ buttonText.NationalAffairs }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary" @click="showModal('Harem')">
          {{ buttonText.Harem }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary" @click="showModal('Offspring')">
          {{ buttonText.Offspring }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary" @click="showModal('SecretPolice')">
          {{ buttonText.SecretPolice }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary" @click="showModal('DirectMessage')">
          {{ buttonText.DirectMessage }}
        </el-button>
      </div>
    </div>

    <div>
      <Modal
        :title="modalTitle"
        :triggerText="modalContent"
        :visible="modalVisible"
        @update:visible="modalVisible = $event"
      >
        <!-- 这里可以插入 Modal 内容 -->
        <p>这是一个示例的 Bootstrap Modal。</p>
      </Modal>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Modal from "./components/Modal.vue"; // 请根据你的目录结构调整路径
export default {
  data() {
    return {
      buttonText: {
        menu: "菜單",
        settings: "設定",
        NationalAffairs: "國家事務",
        Harem: "後宮",
        Offspring: "子嗣",
        SecretPolice: "東廠",
        DirectMessage: "私信",
      },
      descriptionText: "這是一些繁體中文描述。",
      abilityText: {
        Appearance: "外表",
        Intelligence: "智力",
        Military: "軍事",
        Health: "健康",
        Prestige: "聲望",
        Stamina: "體力",
      },
      modalVisible: false,
      modalTitle: "",
      modalContent: "",
    };
  },
  components: {
    Modal,
  },
  computed: {
    ...mapState(["characterAbilities"]),
  },
  methods: {
    ...mapMutations(["updateAbility"]),
    // 显示模态框
    showModal(eventType) {
      console.log("Button clicked:", eventType); // 检查按钮是否被点击
      this.modalVisible = true;
      this.modalTitle = this.buttonText[eventType];
      switch (eventType) {
        case "NationalAffairs":
          this.modalContent = "您已處理國家事務。";
          break;
        case "Harem":
          this.modalContent = "您已訪問後宮。";
          break;
        case "Offspring":
          this.modalContent = "您已有子嗣。";
          break;
        case "SecretPolice":
          this.modalContent = "您已與東廠互動。";
          break;
        default:
          this.modalContent = "這是一些內容。";
      }
    },

    // 关闭模态框
    closeModal() {
      this.modalVisible = false;
    },
    simulateEvent(eventType) {
      // 创建一个包含所有能力的列表，除了 Stamina
      const abilities = [
        "Appearance",
        "Intelligence",
        "Military",
        "Health",
        "Prestige",
      ];

      // 创建一个对象来存储新的能力值
      const newAbilities = {};

      // 遍历能力列表并为每个能力生成随机值
      abilities.forEach((ability) => {
        newAbilities[ability] = Math.floor(Math.random() * 100);
      });

      // 保持 Stamina 不变
      newAbilities.Stamina = this.$store.state.characterAbilities.Stamina;

      // 更新所有能力
      abilities.forEach((ability) => {
        this.$store.commit("updateAbility", {
          ability,
          value: newAbilities[ability],
        });
      });

      // 根据事件类型更新描述文本
      switch (eventType) {
        case "NationalAffairs":
          this.descriptionText = "您已處理國家事務。";
          break;
        case "Harem":
          this.descriptionText = "您已訪問後宮。";
          break;
        case "Offspring":
          this.descriptionText = "您已有子嗣。";
          break;
        case "SecretPolice":
          this.descriptionText = "您已與東廠互動。";
          break;
        default:
          this.descriptionText = "這是一些內容。";
      }
    },
  },
  mounted() {
    // 在组件创建时触发一次随机生成事件
    this.simulateEvent();
  },
};
</script>

<style scoped>
/* 菜单按钮样式 */
.menu-button {
  background-color: #4caf50; /* 背景颜色 */
  border: none; /* 去除按钮边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加按钮阴影 */
  font-size: 16px; /* 文字大小 */
  padding: 10px 20px; /* 按钮内边距 */
  color: white; /* 文字颜色 */
}

/* 设置按钮样式 */
.settings-button {
  background-color: #ff5722; /* 背景颜色 */
  border: none; /* 去除按钮边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加按钮阴影 */
  font-size: 16px; /* 文字大小 */
  padding: 10px 20px; /* 按钮内边距 */
  color: white; /* 文字颜色 */
}
/* 按钮组容器样式 */
.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* 按钮样式 */
.button-group-item {
  margin: 0 10px; /* 按钮之间的水平间距 */
}

.el-button {
  background-color: #007acc; /* 按钮背景颜色 */
  color: white; /* 文字颜色 */
  border: none; /* 去除按钮边框 */
  border-radius: 20px; /* 圆角边框 */
  padding: 10px 20px; /* 按钮内边距 */
  font-size: 16px; /* 文字大小 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加按钮阴影 */
  transition: background-color 0.3s; /* 添加背景颜色变化的过渡效果 */
}

.el-button:hover {
  background-color: #00568c; /* 鼠标悬停时的背景颜色 */
}
.container {
  font-family: "Helvetica Neue", sans-serif;
  padding: 20px;
  background-color: $--color-primary;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: $--color-primary;
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
  height: 200px; /* 设置固定高度 */
  overflow: auto; /* 允许内容溢出时滚动 */
  border: 1px solid #ccc; /* 可选：添加边框 */
}

.btn-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.A,
.B,
.C,
.D,
.E {
  margin-right: 10px;
}

button {
  width: 100%;
  border-radius: 20px;
}

.footer {
  margin-top: 20px;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(6, 1fr);

  .ability {
    background: #b3d6ff63;
    width: fit-content;
    padding: 8px 15px;
    border-radius: 20px;
  }
}

ul {
  color: #085182;
}

.ability-name {
  font-weight: bold;
  font-size: 16px;
  color: #007acc;
}

.ability-value {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #085182;
}

@media (max-width: 768px) {
  /* 在小屏幕上调整样式 */
  .container {
    padding: 10px;
  }

  .description-box {
    font-size: 16px;
  }
}
</style>
