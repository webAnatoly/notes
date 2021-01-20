import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0,
        isLoading: false,
        isAppInitialized: false,
        user: null,
        isSavingNoteStarted: false,
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
        },
        startSavingNote(state) {
            state.isSavingNoteStarted = true;
        },
        endSavingNote(state) {
            console.log('endSavingNote mutation');
            state.isSavingNoteStarted = false;
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
        saveNote ({ commit }, note) {
            commit ('startSavingNote');
            setTimeout(()=> {
                console.log('A\'m a note: ', note);
                commit('endSavingNote');
            }, 5000);
        }
    }
});

export default store