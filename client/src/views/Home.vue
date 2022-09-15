<template>
  <div class="home">
    <h1>Timeline</h1>
    <Search />
    <FilterTimeline :activitiesType="activitiesType" />
    <!-- <ActivityList/> -->
    <!-- <Pagination /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";
import FilterTimeline from "@/components/Filter.vue";
// import ActivityList from "@/components/ActivityList.vue";
// import Pagination from '@/components/Pagination.vue'

export default {
  name: 'home',
  components: {
    Search,
    FilterTimeline,
    // ActivityList
    // Pagination,
  },
  data() {
    return {
      activitiesType: {
        movie:{
          type: "Movie",
          score: false,
          zoom: false
        },
        quiz:{
          type: "Quiz",
          score: true,
          zoom: true
        },
        easy_quiz:{
          type: "Easy Quiz",
          score: true,
          zoom: true
        },
        challenge:{
          type: "Challenge",
          score: true,
          zoom: true
        },
        make_a_map:{
          type: "Make a Map",
          score: false,
          zoom: true
        },
        make_a_movie:{
          type: "Make a Movie",
          score: false,
          zoom: true
        },
        wordplay:{
          type: "Wordplay",
          score: false,
          zoom: true
        },
        related_reading:{
          type: "Related reading",
          score: false,
          zoom: false
        },
        draw_about_it:{
          type: "Draw about it",
          score: false,
          zoom: true
        }
      }
    };
  }
}
</script>
