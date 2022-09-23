<template>
  <div class="search">
    <form class="search-form" autocomplete="off" @submit.prevent="filterByFreeText(searchField)">
      <input
        class="search-field"
        name="search"
        type="text"
        placeholder="Search Timeline"
        v-model="searchField"
        v-on:keyup.enter="$event.target.blur()"
        @input="filterActivities"
        @focus="showAllSuggesments"
      />
      <div class="search-button" @click="filterByFreeText(searchField)">
        <img class="icon" src="/assets/search.png" />
      </div>
    </form>
    <AutoComplete
      v-if="filteredActivities.length > 0"
      :filteredActivities="filteredActivities"
      @selectActivity="selectActivity"
      @closeAutoComplete="clearAllActivities"
    />
  </div>
</template>

<script>
import AutoComplete from "@/components/AutoComplete.vue";
export default {
  name: "Search",
  components: {
    AutoComplete
  },
  data() {
    return {
      searchField: "",
      filteredActivities: [],
      showAutoComplete: false
    };
  },
  props: {
    activitiesType: Array,
    activities: Array
  },

  methods: {
    filterActivities() {
 
      this.filteredActivities = this.activities.filter(activity => {
        const searchedData = `${activity.topic_data.name} ${activity.resource_type}`;
        return searchedData.toLowerCase().includes(this.searchField.toLowerCase());
      });
    },
    showAllSuggesments() {
      this.filteredActivities = this.activities;
      if (this.searchField.length > 0) this.filterActivities();
    },
    clearAllActivities() {
      this.filteredActivities = [];
    },
    selectActivity(activity) {
      this.filteredActivities = [];
      this.searchField = `${activity.topic_data.name} ${activity.resource_type}`;
    },
    filterByFreeText(filterBy) {
      this.searchField = "";
      this.$emit("freeTextFilter", filterBy);
      this.clearAllActivities();
    }
  }
};
</script>
<style scoped>
.search-form {
  display: flex;
  padding: 0;

  width: 250px;
}
.search-field {
  width: 100%;
  height: 30px;
  padding: 1px 10px;
  transition: 0.5s;
  outline: none;
  z-index: 2;
  border: none;
  border: 1px solid #ccc;
  border-radius: 3px 0 0 3px;
}
.search-button {
  width: 100%;
  border: 1px solid #008e9b;
  border-radius: 0 3px 3px 0;
  z-index: 2;
  cursor: pointer;
  padding: 1px 10px;
  margin: 0;
  height: 30px;
  width: 30px;
  background-color: #008e9b;
  color: white;
}
.icon {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
