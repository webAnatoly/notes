<template>
  <div class="notes">
    <div class="stick-menu" ref="stickMenu" v-bind:class="{ 'stick-menu--stick': isPanelAttached }">
      Прилипающее меню для кнопок сортировки и т.д.
    </div>
    <div v-if="!isAuthorized">
      <p>Чтобы просматривать заметки необходимо <router-link to="/auth">авторизироваться</router-link></p>
    </div>
    <Spinner v-else-if="this.$store.state.isGetNotesStarted" color="#78b99b" scale="2" style="margin-top: 11rem"/>
    <div v-else-if="Object.keys(this.$store.state.notes).length > 0" v-for="(val, key) in this.$store.state.notes" :key="key">
      <Note :title="val.title" :description="val.description" :creation-timestamp="val.creationTimestamp" :documentId="key"/>
    </div>
    <div v-else>
      Не удалось получить заметки. Возможные причины:
      <ul>
        <li>Вы не создали ни одной заметки;</li>
        <li>Пропал интернет;</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import Note from "@/components/Note";

export default {
  name: "Notes",
  components: {
    Spinner,
    Note,
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
    align-items: flex-start;
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