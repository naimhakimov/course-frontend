<script setup>
import { onMounted, ref } from 'vue'
import {
  deleteUserById,
  getUsers,
  updateUserById,
} from '@/services/http.service'

const users = ref([])

onMounted(async () => {
  users.value = await getUsers()
})

async function updateUserStatus(active, id) {
  await updateUserById(id, { active })
}

async function deleteUser(id) {
  const isDelete = confirm('Оё шумо дар ҳақиқат мехоҳед нест кунед?')
  if (isDelete) {
    await deleteUserById(id)
    users.value = users.value.filter((user) => user._id !== id)
  }
}
</script>

<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Ном</th>
          <th scope="col">Email</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user._id">
          <th scope="row">{{ index + 1 }}</th>
          <th scope="row">{{ user._id }}</th>
          <td>{{ user.first_name + ' ' + user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                v-model="user.active"
                @change="updateUserStatus(user.active, user._id)"
                class="form-check-input"
                type="checkbox"
              />
            </div>
          </td>

          <td>
            <div role="button" @click="deleteUser(user._id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-octagon-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                />
              </svg>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>