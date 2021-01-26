<template>
  <div class="notes">
    <div class="stick-menu" ref="stickMenu" v-bind:class="{ 'stick-menu--stick': isPanelAttached }">
      <Button v-bind:onClick="sortByDate">Сортировать по дате
        <span v-if="sortDirection === 'ASC'">&#9662;</span>
        <span v-else>&#9652;</span>
      </Button>
    </div>
    <div v-if="!isAuthorized">
      <p>Чтобы просматривать заметки необходимо <router-link to="/auth">авторизироваться</router-link></p>
    </div>
    <Spinner v-else-if="this.$store.state.isGetNotesStarted" color="#78b99b" scale="2" style="margin-top: 11rem"/>
    <div v-else-if="this.$store.state.notes && this.$store.state.notes.length > 0" v-for="note in this.$store.state.notes" :key="note.documentId">
      <Note :title="note.title" :description="note.description" :creation-timestamp="note.creationTimestamp" :documentId="note.documentId"/>
    </div>
    <div v-else>
      Не удалось получить заметки. Возможные причины:
      <ul>
        <li>Вы не создали ни одной заметки;</li>
        <li>Пропал интернет;</li>
      </ul>
    </div>

<!--    Индикатор процесса сортировки заметок-->
    <Overlay v-if="this.$store.state.isSortingStarted" show-loader><Spinner></Spinner></Overlay>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import Note from "@/components/Note";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";

export default {
  name: "Notes",
  components: {
    Spinner,
    Note,
    Button,
    Overlay,
  },
  beforeCreate() {
    if (this.$store.state.user) {
      this.$store.commit('startGetNotes');
      this.$store.dispatch('fetchNotes');
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted () {
    const stickMenuCoordinates = this.$refs.stickMenu.getBoundingClientRect();

    const rect = {
      top: stickMenuCoordinates.top,
      bottom: stickMenuCoordinates.bottom,
      left: stickMenuCoordinates.left,
      right: stickMenuCoordinates.right,
    }

    this.$store.commit('writeStickMenuCoordinates', rect);

  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data: function() {
    return {
      isPanelAttached: false,
      sortDirection: 'DESC', // DESC, ASC
      sortBy: 'date',
    }
  },
  computed: {
    isAuthorized: function() {
      return !!this.$store.state.user;
    },
  },
  methods: {
    handleScroll: function() {
      const infoPanelHeight = this.$store.state.infoPanelHeight;
      const menuPositionTop = this.$store.state.initialStickMenuCoordinates.top;
      const offsetTop = menuPositionTop - infoPanelHeight;
      const scrollY = window.scrollY;

      if (offsetTop <= scrollY) {
        if (!this.isPanelAttached) {
          this.isPanelAttached = true;
          // console.log('прилепили меню');
        }
      } else {
        // console.log('отлепили меню');
        if (this.isPanelAttached) {
          this.isPanelAttached = false;
        }
      }
    },
    sortByDate: function() {
      if (this.sortDirection === 'DESC') {
        this.sortDirection = 'ASC'
      } else {
        this.sortDirection = 'DESC'
      }
      this.$store.dispatch('sortingByDate', this.sortDirection);
    }
  }
}
</script>

<style scoped>
  .notes {
    padding: 0 3rem 3rem 3rem;
  }
  .note {
    margin-bottom: 3rem;
  }

  .stick-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 2rem auto;
    top: 3rem;
    background-color: rgb(245, 245, 220);
    padding: 1rem;
  }

  .stick-menu--stick {
    position: fixed;
    top: 3rem;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    box-shadow: 1px 2px 7px 1px rgba(0,0,0,0.1);
  }
</style>