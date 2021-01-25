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
        notes: {},
        isSortDesc: true,
        currentlyEditableNote: null,
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
        },
        endGetNotes(state) {
            state.isGetNotesStarted = false;
        },
        updateNotes(state, payload) {
            state.notes = payload.notes;
        },
        startEditingNote(state, note) {
            state.currentlyEditableNote = note;
        },
        endEditingNote(state) {
            state.currentlyEditableNote = null;
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
        saveNoteAfterEditing({ commit, state }, note) {

            if (!state.user) { return }

            commit ('startSavingNote');

            const db = firebaseApp.firestore();

            const currentNote = db.collection("notes").doc(state.currentlyEditableNote.documentId);

            currentNote.update({
                title: note.title,
                description: note.description,
            })
                .then(function() {
                    commit('savingNoteSuccess', {msg: "Заметка успешно обновлена!"});
                    commit('endSavingNote');
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                    commit('savingNoteError', {msg: "Ошибка обновления заметки!"});
                    commit('endSavingNote');
                });

            // commit('savingNoteError', {msg: "Ошибка сохранения заметки!"});
        },
        fetchNotes({commit, state}) {

            const db = firebaseApp.firestore();
            let orderName = "creationTimestamp";
            const orderDirection = state.isSortDesc ? "desc" : "asc";

            db.collection("notes")
                .where("email", "==", state.user.email)
                .where("creationTimestamp", ">", 1)
                .orderBy(orderName, orderDirection)
                .limit(5000)// [TO DO] сделать пагинацию
                .get()
                .then(function(querySnapshot) {

                    if (!querySnapshot.docs.length) {
                        console.log("По указынным критериям не выбрано ни одной заметки: ", querySnapshot.docs.length);
                    }

                    const notes = {};

                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        notes[doc.id] = doc.data();
                        commit('updateNotes', {notes});
                    });
                    commit('endGetNotes');
                })
                .catch(function(error) {
                    commit('endGetNotes');
                    console.log("Error getting documents: ", error);
                });
        },
    }
});

export default store