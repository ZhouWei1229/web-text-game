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

// 生成妃子和大臣的初始数据
const generateCharacter = () => {
  const character = { ...initialAbilities };
  // 随机生成属性值，范围从 25 到 100
  for (const key in character) {
    character[key] = getRandomInt(25, 100);
  }
  return character;
};

export default createStore({
  state: {
    gameStarted: false,
    characterAbilities: { ...initialAbilities },
    consorts: [], // 妃子列表
    ministers: [], // 大臣列表
  },
  mutations: {
    startGame(state) {
      state.gameStarted = true;
    },
    updateAbility(state, { ability, value }) {
      // 限制每个能力的上限为100
      state.characterAbilities[ability] = Math.min(value, 100);
    },
    resetAbilities(state) {
      // 重置所有能力为基础值
      state.characterAbilities = { ...initialAbilities };
    },
    addConsort(state) {
      state.consorts.push(generateCharacter());
    },
    addMinister(state) {
      state.ministers.push(generateCharacter());
    },
  },
  actions: {
    startGame({ commit }) {
      commit("startGame");
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
