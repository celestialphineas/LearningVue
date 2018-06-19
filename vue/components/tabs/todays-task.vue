<template>
  <div>
    <TaskFlashcard word="hello"/>
  </div>
</template>

<script>
import TaskFlashcard from '../widgets/task-flashcard.vue';

export default {
  name: 'TodaysTask',
  data() {
    return {

    }
  },
  components: {
    TaskFlashcard
  }
}
</script>
