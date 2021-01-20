import Vue from 'vue'
import Vuex from 'vuex'
import {firebaseApp} from "@/api/firebase/db";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        isAppInitialized: false,
        user: null,
        isSavingNoteStarted: false,
        isSavingNoteError: null,
        isSavingNoteSuccess: null,
        isGetNotesStarted: false,
        isGetNotesError: null,
        isGetNotesSuccess: null,
    },
    // Remember that Mutations have to be synchronous. For asynchronous operations use Actions.
    mutations: {
        updateUser (state, payload) {
            state.user = payload.user;
        },
        appInitFinished (state) {
            const initScreen = document.getElementById('initScreen');
            initScreen.style.display = 'none';
            state.isAppInitialized = true;
        },
        startSavingNote(state) {
            state.isSavingNoteStarted = true;
        },
        endSavingNote(state) {
            state.isSavingNoteStarted = false;
        },
        savingNoteSuccess(state, payload) {
            state.isSavingNoteSuccess = payload.msg;
        },
        savingNoteError(state, payload) {
            state.isSavingNoteError = payload.msg;
        },
        resetSavingNoteState(state) {
            state.isSavingNoteStarted =false;
            state.isSavingNoteError = null;
            state.isSavingNoteSuccess = null;
        },
        startGetNotes(state) {
            state.isGetNotesStarted = true;
        }
    },
    // регистрация actions.
    // Actions - это то же самое что и mutations но только для асинхронного кода, например для запросов на сервер и т.д.
    actions: {
        saveNote ({ commit, state }, note) {

            if (!state.user) { return }

            commit ('startSavingNote');

            const db = firebaseApp.firestore();
            db.collection("notes").add({
                title: note.title,
                description: note.description,
                email: state.user.email,
                creationTimestamp: Date.now(),
            })
                .then(function(docRef) {
                    commit('endSavingNote');
                    commit('savingNoteSuccess', {msg: "Заметка успешно сохранена!"});
                    console.log("Заметка успешно создана ", docRef);
                })
                .catch(function(error) {
                    commit('endSavingNote');
                    commit('savingNoteError', {msg: "Ошибка сохранения заметки!"});
                    console.error("Error adding document: ", error);
                });


        },
        fetchNotes({state}) {
            const db = firebaseApp.firestore();
            db.collection("notes").where("email", "==", state.user.email)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        },
    }
});

export default store