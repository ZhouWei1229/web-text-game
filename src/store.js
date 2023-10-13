// store.js
import { createStore } from "vuex";

// 函数用于生成随机数，最低值和最高值之间的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialAbilities = {
  Appearance: 0,
  Intelligence: 0,
  Military: 0,
  Stamina: 5,
  Health: 0,
  Prestige: 0,
};

const generateCharacter = () => {
  const character = { ...initialAbilities };
  // 随机生成属性值，范围从 25 到 100
  for (const key in character) {
    character[key] = getRandomInt(25, 100);
  }
  return character;
};

// 生成妃子和大臣的初始数据
const initializeNPC = () => {
  const consorts = [];
  const ministers = [];

  // 添加皇后
  consorts.push({ ...generateRandomNPCAbilities(), isQueen: true });

  // 添加其余妃子
  for (let i = 1; i < 5; i++) {
    consorts.push({ ...generateRandomNPCAbilities() });
  }

  // 添加大臣
  for (let i = 0; i < 5; i++) {
    ministers.push({ ...generateRandomNPCAbilities() });
  }

  return { consorts, ministers };
};

// 生成随机NPC属性值
function generateRandomNPCAbilities() {
  const abilities = {
    Name: generateRandomChineseName(),
    Appearance: getRandomInt(25, 100),
    Intelligence: getRandomInt(25, 100),
    Military: getRandomInt(25, 100),
    Trust: getRandomInt(25, 100),
    Suspicion: getRandomInt(25, 100),
    Power: getRandomInt(25, 100),
  };
  return abilities;
}

// 中文姓氏
const chineseLastNames = [
  "赵",
  "钱",
  "孙",
  "李",
  "周",
  "吴",
  "郑",
  "王",
  "冯",
  "陈",
  "褚",
  "卫",
  "蒋",
  "沈",
  "韩",
  "杨",
  "朱",
  "秦",
  "尤",
  "许",
];

// 中文名字
const chineseFirstNames = [
  "婷",
  "明",
  "红",
  "军",
  "静",
  "玉",
  "杰",
  "雪",
  "伟",
  "丽",
  "华",
  "强",
  "美",
  "明",
  "宇",
  "燕",
  "刚",
  "萍",
  "涛",
  "萌",
];

// 随机生成中文姓名
function generateRandomChineseName() {
  const randomLastName =
    chineseLastNames[Math.floor(Math.random() * chineseLastNames.length)];
  const randomFirstName =
    chineseFirstNames[Math.floor(Math.random() * chineseFirstNames.length)];
  return randomLastName + randomFirstName;
}

// 使用示例
const randomName = generateRandomChineseName();
console.log(randomName); // 打印随机生成的中文姓名

export default createStore({
  state: {
    gameStarted: false,
    characterAbilities: { ...initialAbilities },
    consorts: [], // 妃子列表
    ministers: [], // 大臣列表
  },
  mutations: {
    updateAbility(state, { ability, value }) {
      // 限制每个能力的上限为100
      state.characterAbilities[ability] = Math.min(value, 100);
    },
    resetAbilities(state) {
      // 重置所有能力为基础值
      state.characterAbilities = { ...initialAbilities };
    },
    initializeNPC(state) {
      const { consorts, ministers } = initializeNPC();
      state.consorts = consorts;
      state.ministers = ministers;
    },
  },
  actions: {
    initializeNPC({ commit }) {
      commit("initializeNPC");
    },
    updateAbility({ commit }, payload) {
      commit("updateAbility", payload);
    },
    resetAbilities({ commit }) {
      commit("resetAbilities");
    },
    recruitConsort({ commit }) {
      commit("addConsort");
    },
    recruitMinister({ commit }) {
      commit("addMinister");
    },
  },
  getters: {
    // getters 可以用来获取 state 中的数据
  },
});
