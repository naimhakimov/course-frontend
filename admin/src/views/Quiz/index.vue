<script setup>
import { onMounted, ref } from 'vue'
import { getQuiz, removeQuizById } from '@/services/http.service'

const quizList = ref([])

onMounted(async () => {
  quizList.value = await getQuiz()
})

async function removeQuiz(item) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await removeQuizById(item._id)
    quizList.value = quizList.value.filter(
      (lecture) => lecture._id !== item._id
    )
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3>Тестхо</h3>

      <button class="btn btn-primary" @click="$router.push('/quiz/create')">
        Сохтани тест
      </button>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between"
        v-for="(quiz, index) in quizList"
        :key="quiz._id"
      >
        {{ index + 1 }}. {{ quiz.question }}
        <div class="btn btn-group">
          <button class="btn btn-danger" @click="removeQuiz(quiz)">
            &times;
          </button>
          <button
            class="btn btn-primary"
            @click="$router.push('/quiz/edit/' + quiz._id)"
          >
            Тахрир
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>