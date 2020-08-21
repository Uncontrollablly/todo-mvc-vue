import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';
import Vuex, { mapState, mapGetters } from 'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.esm.browser.js';
import * as AppHeader from './components/header.js'
import * as AppContent from './components/content.js'
import * as AppFooter from './components/footer.js'

Vue.use(Vuex)

const styleTag = document.createElement('style');
document.head.appendChild(styleTag);
styleTag.appendChild(document.createTextNode(AppHeader.style || ''))

styleTag.appendChild(
    document.createTextNode(
        (AppHeader.style || '')
            .replace(
                /\{\{parent\}\}/g,
                `[data-cid-${AppHeader.script.name}]`
            )
    )
)
Vue.component(AppHeader.script.name, {
    ...AppHeader.script,
    template: AppHeader.template.replace(
        /<([a-z0-9]+)/,
        `<$1 data-cid-${AppHeader.script.name}`
    )
})

styleTag.appendChild(
    document.createTextNode(
        (AppContent.style || '')
            .replace(
                /\{\{parent\}\}/g,
                `[data-cid-${AppContent.script.name}]`
            )
    )
)
Vue.component(AppContent.script.name, {
    ...AppContent.script,
    template: AppContent.template.replace(
        /<([a-z0-9]+)/,
        `<$1 data-cid-${AppContent.script.name}`
    )
})

styleTag.appendChild(
    document.createTextNode(
        (AppFooter.style || '')
            .replace(
                /\{\{parent\}\}/g,
                `[data-cid-${AppFooter.script.name}]`
            )
    )
)
Vue.component(AppFooter.script.name, {
    ...AppFooter.script,
    template: AppFooter.template.replace(
        /<([a-z0-9]+)/,
        `<$1 data-cid-${AppFooter.script.name}`
    )
})

// todo: {
//     id: number,
//     text: string,
//     state: active(false) | completed(true),
//     editing: boolean,
// }
// {id:0, text: 'learn vue', state: true, editing: false}

const store = new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        increment (state, payload) {
            console.log('payload', payload.content);
            state.count++;
        }
    }
})

Vue.directive('focus', {
    bind: function (el) {
        console.log('focus directive bind');
        el.focus();
    },
    inserted: function (el) {
        console.log('focus directive inserted');
        // el.focus();
    },
})

const app = new Vue({
    el: '.todoapp',
    data: {
        id: 0,
        tag: 'all',
        todos: [],
        count1: store.state.count,
        obj: {}
    },
    computed: {
        activeTodos: function () {
            return this.todos.filter(todo => !todo.state);
        },
        completedTodos: function () {
            return this.todos.filter(todo => todo.state);
        },
        displayTodos: function () {
            return this.tag === 'all' ?
                this.todos :
                (this.tag === 'active' ? this.activeTodos : this.completedTodos);
        },
        ...mapState(['count', 'newProp1']),
    },
    created() {
        // Vue.set(this.$store.state, 'newProp1', 'abc');
        // console.log(this.$store.state);
        Vue.set(this.$data.obj, 'newProp2', 'abc');
        console.log(this.$data);
    },
    methods: {
        addCount: function () {
            store.commit('increment', {content: 'hello'});
        },
        addTodo: function (todo) {
            this.id += 1;
            const text = todo && todo.trim();
            if (!text) {
                return;
            }
            const newTodo = {
                id: this.id,
                text,
                state: false,
                editing: false,
            }
            this.todos.push(newTodo);
        },
        deleteTodo: function (todo) {
            const index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
        showTag: function (tag) {
            this.tag = tag;
        },
        clearCompletedTodos: function () {
            this.todos = this.activeTodos;
        },
        toggleCompleted: function (toggle) {
            this.todos.map(todo => todo.state = toggle);
        }
    },
    components: {
        // 'app-content': AppContent
    },
    store,
})
