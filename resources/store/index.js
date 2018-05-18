import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
let cookieparser = require('cookieparser');
let UUID = require('uuid-js');
Vue.use(Vuex);
Vue.use(VueRouter);

const store = () => new Vuex.Store({

    state: {
        auth: null,
        tokens: null
    },

    mutations: {
        SET_USER: function (state, user) {
            state.auth = user
        },
        SET_TOKEN: function (state, token) {
            state.tokens = token
        }
    },

    getters: {
        auth: state => state.auth,
        token: state => state.auth.jwt.token,
        tokens: state => state.tokens
    },

    actions: {
        nuxtClientInit({commit}) {
            if (typeof localStorage !== 'undefined' && localStorage.getItem('plasma_auth')) {
                const auth = JSON.parse(localStorage.getItem('plasma_auth'));
                commit('SET_USER', auth);
                this.$axios.setToken(auth.jwt.token, 'Bearer');
            }
        },

        nuxtServerInit ({ commit }, { req }) {
            if (req.session && req.session.auth) {
                commit('SET_USER', req.session.auth)
            }
        },

        async login({commit}, user) {
            try {
                const auth = await this.$axios.$post('login', user);
                const tokens = 'someStringGotFromApiServiceWithAjax';
                if (auth.jwt) {
                    commit('SET_USER', auth);
                    commit('SET_TOKEN', tokens);
                    Cookie.set('auth', tokens, {expires: 325});
                    localStorage.setItem('handmade_auth', JSON.stringify(auth));
                    localStorage.setItem('session', 'true');
                    this.$axios.setToken(auth.jwt.token, 'Bearer');
                }
                return auth
            } catch (err) {
                return err
            }
        },

        async logout({commit}) {
            await this.$axios.$post('logout');
            commit('SET_USER', null);
            Cookie.remove('auth');
            localStorage.removeItem('handmade_auth');
        },

        async register({commit}, user) {
            try {
                const auth = await this.$axios.$post('register', user);
                if (auth.jwt) {
                    commit('SET_USER', auth);
                    localStorage.setItem('handmade_auth', JSON.stringify(auth));
                    localStorage.setItem('session', 'true');
                    this.$axios.setToken(auth.jwt.token, 'Bearer');
                }
                return auth
            } catch (err) {
                return err
            }
        },

        async refreshToken({commit, state}) {
            try {
                const auth = await this.$axios.$post('refreshToken', {refreshToken: UserController.refreshToken});
                if (auth.jwt) {
                    commit('SET_USER', auth);
                    localStorage.setItem('handmade_auth', JSON.stringify(auth));
                    this.$axios.setToken(auth.jwt.token, 'Bearer');
                    return auth.jwt.token
                } else {
                    return false
                }
            } catch (err) {
                return err
            }
        }

    }

});

export default store
