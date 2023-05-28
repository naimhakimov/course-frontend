<script setup>
import { HTTP } from '@/plugins/axios'
import { onMounted, reactive, ref } from 'vue'

const items = reactive({
  quiz: [],
})
const result = ref(null)

onMounted(async () => {
  result.value = await HTTP.get('/results/currentUser')
  if (!result.value) {
    getQuiz();
  }
})

async function getQuiz(){ 
  items.quiz = await HTTP.get('/quiz')
    items.quiz = items.quiz.map((item) => {
      return {
        ...item,
        options: item.options.map((option, index) => {
          return {
            ...option,
            answer: index === 0,
          }
        }),
      }
    })
}

function changeRadioButton(parentIdx, index) {
  items.quiz[parentIdx].options = items.quiz[parentIdx].options.map(
    (item, idx) => ({ ...item, answer: idx === index })
  )
}
async function submit() {
  result.value = await HTTP.post('quiz/check', items.quiz)
}

async function removeResult() {
   await HTTP.delete('/results/currentUser');
   result.value = null;
   getQuiz();
}
</script>
<template>
  <div class="lecture">
    <div class="test">
      <div class="test_name">
        <h1 style="text-align: center">ТЕСТҲО</h1>
      </div>
      <template v-if="!result">
        <div
          class="test_body"
          v-for="(quiz, parentIdx) in items.quiz"
          :key="quiz._id"
        >
          <h4>{{ parentIdx + 1 + '.' + quiz.question }}</h4>
          <div class="test_sel" v-for="(v, index) in quiz.options" :key="v.uid">
            <input
              @change="changeRadioButton(parentIdx, index)"
              type="radio"
              :value="index"
              :checked="v.answer"
              :id="v.uid"
            />
            &nbsp;
            <label :for="v.uid">{{ v.title }}</label>
          </div>
        </div>

        <div class="test_submit">
          <button @click="submit" class="lecture_save">Санҷидан</button>
        </div>
      </template> 

      <div v-else>
        <div class="d-flex justify-content-between mb-2">
          <h3>Натичаи шумо: {{ result.result }}</h3>
          <button @click="removeResult" class="btn btn-danger">Аз нав супоридан</button>
        </div> 

        <div class="card p-2" v-for="quiz in result.quiz" :key="quiz._id">
          <h5>{{ quiz.question }}</h5>
          <div
            v-for="(item, index) in quiz.options"
            :key="item.uid"
            :class="
              quiz.answer === item.uid && quiz.correct
                ? 'text-success'
                : quiz.answer === item.uid && !quiz.correct && 'text-danger'
            "
          >
            {{ index + 1 + '.' + item.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>