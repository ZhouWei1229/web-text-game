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
    <div class="btn-group">
      <div class="button-group-item">
        <el-button type="primary">
          {{ buttonText.NationalAffairs }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary">
          {{ buttonText.Harem }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary">
          {{ buttonText.Offspring }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary">
          {{ buttonText.SecretPolice }}
        </el-button>
      </div>
      <div class="button-group-item">
        <el-button type="primary">
          {{ buttonText.DirectMessage }}
        </el-button>
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

    <div class="info-group">
      <div>
        <div v-for="(consort, index) in consortsWithStyles" :key="index">
          <div class="consort">
            <div class="ability">
              <span class="ability-name">{{ consort.name }}</span>
              <div class="ability-details">
                <span :class="consort.styleClasses + ' ability-details'">
                  {{ consort.description }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-for="(minister, index) in ministersWithStyles" :key="index">
          <div class="minister">
            <div class="ability">
              <span class="ability-name">{{ minister.name }}</span>
              <div class="ability-details">
                <span :class="minister.styleClasses + ' ability-details'">
                  {{ minister.description }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
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
        Power: "權力",
      },
      modalVisible: false,
      modalTitle: "",
      modalContent: "",
    };
  },
  components: {},
  computed: {
    ...mapState(["characterAbilities", "consorts", "ministers"]),
    consortsWithStyles() {
      return this.consorts.map((consort, index) => {
        const description = `外表:${consort.Appearance}, 智力:${consort.Intelligence}, 軍事:${consort.Military}, 信任度:${consort.Trust}, 懷疑度:${consort.Suspicion}, 權勢:${consort.Power}`;
        return {
          name: `妃子：${consort.Name}`,
          description,
          styleClasses: {
            "ability-value-label": true,
            "ability-value": true,
          },
        };
      });
    },
    ministersWithStyles() {
      return this.ministers.map((minister, index) => {
        const description = `外表:${minister.Appearance}, 智力:${minister.Intelligence}, 軍事:${minister.Military}, 信任度:${minister.Trust}, 懷疑度:${minister.Suspicion}, 權勢:${minister.Power}`;
        return {
          name: `大臣：${minister.Name}`,
          description,
          styleClasses: {
            "ability-value-label": true,
            "ability-value": true,
          },
        };
      });
    },
  },
  methods: {
    ...mapMutations(["updateAbility"]), // 将 updateAbility 映射到组件中的方法
    ...mapActions(["initializeNPC"]),
  },
  mounted() {
    this.initializeNPC(); //新增大臣與妃子
    this.updateAbility(); //重製角色的數值
  },
};
</script>

<style scoped>
.info-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
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
    margin: 8px 4px;
    background: #b3d6ff63;
    width: fit-content;
    padding: 8px 15px;
    border-radius: 20px;
  }
}

.ability-details {
  background: #b3d6ff63;
  width: fit-content;
  padding: 8px 15px;
  border-radius: 9px;
  margin: 12px 8px;
  font-weight: bold;
  color: #00168c;
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
