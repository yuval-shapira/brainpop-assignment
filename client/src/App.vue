<template>
  <div id="app">
    <h1>Timeline1111</h1>
    <Search />
    <FilterTimeline :activitiesType="activitiesType" @filterAct="getFilter" />
    <ActivityList :activitiesType="activitiesType" :filterBy="filterBy" />
    <!-- <Pagination /> -->
    <router-view />
  </div>
</template>
<script>
import store from "@/store";
import Search from "@/components/Search.vue";
import FilterTimeline from "@/components/Filter.vue";
import ActivityList from "@/components/ActivityList.vue";
// import Pagination from '@/components/Pagination.vue'

export default {
  name: "app",
  components: {
    Search,
    FilterTimeline,
    ActivityList
    // Pagination,
  },
  methods: {
    getFilter(act) {
      console.log("getFilter", act);
      this.filterBy = act;
    }
  },
  data() {
    return {
      activitiesType: store.activitiesType,
      filterBy: "all"
    };
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
