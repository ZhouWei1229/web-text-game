<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <el-button type="primary" round>{{ buttonText.menu }}</el-button>
      </div>
      <div class="right">
        <el-button type="primary" round>{{ buttonText.settings }}</el-button>
      </div>
    </div>
    <div class="content">
      <div class="description-box">
        {{ descriptionText }}
      </div>
    </div>
    <!-- A按钮点击后显示模态框 -->
    <div class="A">
      <el-button type="primary" round @click="showModal('NationalAffairs')">
        {{ buttonText.NationalAffairs }}
      </el-button>
    </div>

    <!-- B按钮点击后显示模态框 -->
    <div class="B">
      <el-button type="primary" round @click="showModal('Harem')">
        {{ buttonText.Harem }}
      </el-button>
    </div>

    <!-- C按钮点击后显示模态框 -->
    <div class="C">
      <el-button type="primary" round @click="showModal('Offspring')">
        {{ buttonText.Offspring }}
      </el-button>
    </div>

    <!-- D按钮点击后显示模态框 -->
    <div class="D">
      <el-button type="primary" round @click="showModal('SecretPolice')">
        {{ buttonText.SecretPolice }}
      </el-button>
    </div>

    <!-- 模态框 -->
    <el-dialog
      :visible="modalVisible"
      :title="modalTitle"
      @close="closeModal"
      width="60%"
    >
      <p>{{ modalContent }}</p>
    </el-dialog>
    <div class="footer">
      <ul>
        <li v-for="(value, ability) in characterAbilities" :key="ability">
          <span class="ability-name">{{ abilityText[ability] }}:</span>
          <span class="ability-value">{{ value }}</span>
        </li>
      </ul>
    </div>

    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
    <CustomModal
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </CustomModal>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import CustomModal from "./components/Modal.vue"; // 请根据您的项目结构调整路径
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
      dialogVisible: false,
    };
  },
  components: {
    CustomModal,
  },
  computed: {
    ...mapState(["characterAbilities"]),
  },
  methods: {
    ...mapMutations(["updateAbility"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
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
