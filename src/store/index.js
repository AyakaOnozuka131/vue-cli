import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';
import { re } from 'prettier/doc';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null
  },
  getters: {
    idToken: state => state.idToken
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    }
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if( !idToken ) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getItem() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshIdToken');
      if(isExpired) {
        await dispatch('refreshIdToken', refreshToken);
      } else {
        const expireInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expireInMs);
        commit('updateIdToken', idToken);
      }
      commit('updateIdToken', idToken);
    },
    login({ dispatch }, authData) {
      axios.post(
        '/accounts:signInWithPassword?key=AIzaSyBQxNHgW403a7qzk4bS9x5gfu2w1D6u6-E',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('authData', {
          idToken: response.data.idToken,
          expireIn: response.data.expireIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/');
      });
    },
    async refreshIdToken({ dispatch }, refreshToken) {
      await axiosRefresh.post(
        '/token?key=[AIzaSyBQxNHgW403a7qzk4bS9x5gfu2w1D6u6-E',
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      ).then(response => {
        dispatch('authData', {
          idToken: response.data.idToken,
          expireIn: response.data.expire_in,
          refreshToken: response.data.refresh_token
        });
      });
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    },
    register({ dispatch }, authData) {
      axios.post(
        '/accounts:signUp?key=AIzaSyBQxNHgW403a7qzk4bS9x5gfu2w1D6u6-E',
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }
      ).then(response => {
        dispatch('authData', {
          idToken: response.data.idToken,
          expireIn: response.data.expireIn,
          refreshToken: response.data.refreshToken
        });
        router.push('/');
      });
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expireIn * 1000;
      commit('updateIdToken', authData.idToken);
      localStorage.setItem('idToken', authData.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshIdToken', authData.refreshToken);
      setTimeout(() => {
        dispatch('refreshToken', authData.refreshToken);
      }, authData.expireIn * 1000);
    }
  }
});
