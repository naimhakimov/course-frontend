<script setup>
import { toast } from '@/plugins/toast'
import { craeteQuiz, getQuizById, updateQuiz } from '@/services/http.service'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const quiz = reactive({
  question: '',
  options: [
    { answer: false, title: '' },
    { answer: false, title: '' },
    { answer: false, title: '' },
    { answer: false, title: '' },
  ],
})

onMounted(async () => {
  if (route.params.id) {
    const data = await getQuizById(route.params.id)
    quiz.question = data.question
    quiz.options = data.options.map((item, index) => {
      const isAnswer = item.uid === data.answer
      if (isAnswer) {
        changeRadioButton(index)
      }
      return {
        ...item,
        answer: isAnswer,
      }
    })
  }
})

function changeRadioButton(index) {
  quiz.options = quiz.options.map((item) => ({ ...item, answer: false }))
  quiz.options[index].answer = true
}

async function onSubmit() {
  if (!route.params['id']) {
    await craeteQuiz(quiz)
    await toast.success('Сохта шуд')
  } else {
    await updateQuiz(route.params['id'], quiz)
    await toast.success('Навсози карда шуд')
  }
  await router.push('/quiz')
}
</script>

<template>
  <div class="mb-3 card p-3">
    <h3>{{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}</h3>
    <div>
      <label class="form-label">Ном</label>
      <input
        v-model="quiz.question"
        type="text"
        class="form-control mb-2"
        placeholder="some text"
      />
    </div>

    <div class="d-flex flex-column gap-2">
      <div
        class="d-flex align-items-center gap-2"
        v-for="(item, index) in quiz.options"
        :key="index"
      >
        <div>
          <input
            :checked="item.answer"
            type="radio"
            @change="changeRadioButton(index)"
            :value="index"
            name="answer"
            class="form-check-input"
          />
        </div>

        <div class="w-100">
          <input
            v-model="item.title"
            type="text"
            name="answer"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <button
      @click="onSubmit"
      :disabled="!quiz.question && quiz.options.length !== 4"
      class="btn btn-primary mt-2"
    >
      {{ route.params.id ? 'Дохил кардан' : 'Сохтан' }}
    </button>
  </div>
</template>