import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        isLoading: false,
        isAppInitialized: false,
        user: null,
    },
    // Remember that Mutations have to be synchronous. For asynchronous operations use Actions.
    mutations: {
        increment (state) {
            state.count++
        },
        updateUser (state, payload) {
            state.user = payload.user;
        },
        appInitFinished (state) {
            state.isAppInitialized = true;
        }
    },
    // регистрация actions.
    // Actions - это то же самое что и mutations но только для асинхронного кода, например для запросов на сервер и т.д.
    actions: {
        increment (context) {
            context.commit('increment');
        },
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 3000)
        },
    }
});

export default store