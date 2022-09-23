<template>
  <div class="filter-by-timeline">
    <h3>Filter by</h3>
    <div class="flex-container">
      <button
        class="btn-filter-activity"
        :class="selectedFilter === 'all' ? 'selected-filter' : ''"
        @click="filterByActivity('all')"
      >
        All Work
      </button>
      <button
        class="btn-filter-activity"
        :class="selectedFilter === activity.resource_type ? 'selected-filter' : ''"
        v-for="activity in activitiesType"
        :key="activity.id"
        @click="filterByActivity(activity.resource_type)"
      >
        {{ activity.type }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterTimeline",
  props: {
    activitiesType: Array
  },
  data() {
    return {
      selectedFilter: "all"
    };
  },
  methods: {
    filterByActivity(filterBy) {
      this.selectedFilter = filterBy;
      this.$emit("filterByType", filterBy);
    }
  }
};
</script>
<style>
.btn-filter-activity {
  border: 2px solid #008E9B;
  border-radius: 5px;
  background-color: white;
  color: #008E9B;
  font-weight: bold;
  padding: 5px 10px;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin: 2px 1px;
  cursor: pointer;
}
.selected-filter {
  background-color: #008e9b16;
}
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
