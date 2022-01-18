import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rate: null,
    activeRate: "RUB"
  },
  mutations: {
    SET_RATES: (state, rates) => {
      state.rate = rates;
    },
    SET_RATE_ACTIVE: (state, value) => {
      state.activeRate = value;
    }
  },
  actions: {
    GET_STORE_API({commit}) {
      return axios('https://www.cbr-xml-daily.ru/daily_json.js', {
      method: "GET"
    }).then((rates) => {
      commit('SET_RATES', rates.data.Valute);
      return rates;
    })
    .catch((error) => {
      console.log(error)
      return error;
    })
    },
    SET_RATE_ACTIVE({commit}, value) {
      commit("SET_RATE_ACTIVE", value)
    }
  },
  getters: {
    RATES: state => {
      return state.rate
    },
    ACTIVE_RATE: state => {
      return state.activeRate
    }
  }
});

