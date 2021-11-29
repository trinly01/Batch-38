<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 38 Todo App {{ description }}</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" @click="$router.push('/')" />
    </q-toolbar>
    <div class="q-ma-md">
      <greet v-model="name" fname="Trinmar" lname="pogi" @updateParent="(newData) => name=newData " />
      <q-input @keyup.enter="addTask" v-model="description" label="type your task here" />
      <q-btn icon="add_circle" label="add" outline color="primary" @click="addTask"  />
      <q-list bordered separator>
        <q-item v-for="(todo) in filteredTodos" :key="todo.id" clickable v-ripple @blur="hovering = null" @mouseover="hovering = todo.id">
          <q-item-section avatar>
            <q-checkbox :modelValue="todo.isDone" @click="toggleIsDone(todo)"/>
          </q-item-section>
          <q-item-section :class="{ 'text-strike': todo.isDone }">
            {{ todo.desc }}
          </q-item-section>
          <q-item-section side>
            <q-btn @click="deleteTask(todo)" round icon="delete" size="sm" color="red" v-show="hovering === todo.id" />
          </q-item-section>
        </q-item>
      </q-list>
      <div>
        {{ itemsLeft }} items left

        <q-btn-toggle
          v-model="showBy"
          toggle-color="primary"
          :options="[
            {label: 'All', value: 'all'},
            {label: 'Active', value: 'active'},
            {label: 'Completed', value: 'completed'}
          ]"
        />
      </div>
      <pie-chart :donut="true" :data="[['Active', itemsLeft], ['Completed', todos.length - itemsLeft]]"></pie-chart>
    </div>
  </div>
</template>

<script>
import greet from 'components/greet.vue'

export default {
  components: {
    greet
  },
  mounted () {
    this.todosSrvc = this.$wingsApp.wingsService('todos')
    this.todosSrvc.on('dataChange', (todos) => {
      console.log(todos)
      this.todos = [...todos]
    }).init()
  },
  data () {
    return {
      name: '',
      todosSrvc: null,
      showBy: 'all',
      hovering: null,
      description: 'hello',
      todos: [
        {
          id: 1,
          isDone: false,
          desc: 'create input box asd'
        },
        {
          id: 2,
          isDone: false,
          desc: 'create save button'
        }
      ]
    }
  },
  methods: {
    addTask () {
      if (this.description) {
        console.log('ang pogi ko talaga', this.description)
        // this.todos.unshift({
        //   id: Date.now(),
        //   isDone: false,
        //   desc: this.description
        // })
        this.todosSrvc.create({
          isDone: false,
          desc: this.description
        })
        this.description = ''
      }
    },
    deleteTask: function (t) {
      // const i = this.todos.findIndex(todo => t.id === todo.id)
      // this.todos.splice(i, 1)
      this.todosSrvc.remove(t._id)
    },
    toggleIsDone (todo) {
      this.todosSrvc.patch(todo._id, {
        isDone: !todo.isDone
      })
    }
  },
  computed: {
    itemsLeft () {
      // return this.todos.filter(todo => {
      //   return todo.isDone === false
      // }).length
      return this.todos.filter(t => !t.isDone).length
    },
    filteredTodos () {
      switch (this.showBy) {
        case 'completed':
          return this.todos.filter(t => t.isDone)
        case 'active':
          return this.todos.filter(t => !t.isDone)
        default:
          return this.todos
      }
    }
  }
}
</script>
