<template>
  <div class="search">
    <input type="text" placeholder="Search Timeline" v-model="search" />
  </div>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
    search: ""
    }
  },
  methods: {
    searchTimeline() {
      console.log(this.search);
    }
  },

};
</script>
