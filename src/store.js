// store.js
import { createStore } from 'vuex';

const initialAbilities = {
    Appearance: 0,
    Intelligence: 0,
    Military: 0,
    Stamina: 5,
    Health: 0,
    Prestige: 0,
};

export default createStore({
    state: {
        gameStarted: false,
        characterAbilities: { ...initialAbilities },
    },
    mutations: {
        startGame(state) {
            state.gameStarted = true;
        },
        updateAbility(state, { ability, value }) {
            if(state.characterAbilities[ability] === 'Stamina') Math.min(value, 5);
            // 限制每个能力的上限为100
            state.characterAbilities[ability] = Math.min(value, 100);
        },
        resetAbilities(state) {
            // 重置所有能力为基础值
            state.characterAbilities = { ...initialAbilities };
        },
    },
    actions: {
        startGame({ commit }) {
            commit('startGame');
        },
        updateAbility({ commit }, payload) {
            commit('updateAbility', payload);
        },
        resetAbilities({ commit }) {
            commit('resetAbilities');
        },
    },
    getters: {
        // getters 可以用来获取 state 中的数据
    },
});
