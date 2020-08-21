export const template = `
   <header class="header">
        <h1>{{ title }}</h1>
        <input
                autocomplete="off"
                placeholder="What needs to be done?"
                class="new-todo"
                v-focus
                v-model="todo"
                @keyup.enter="addTodo"
        >
        <div class="toggle-all-wrapper" v-show="haveTodos">
            <input
                id="toggle-all"
                type="checkbox"
                class="toggle-all"
                v-model="toggleCompleted"
                @change="$emit('toggle-completed', toggleCompleted)"
            >
            <label for="toggle-all">
                "Mark all as complete"
            </label>
        </div> 
    </header>
`;

export const script = {
    name: 'app-header',
    props: ['haveTodos'],
    data: function () {
        return {
            title: 'todos',
            todo: '',
            toggleCompleted: false,
        }
    },
    methods: {
        addTodo: function () {
            this.$emit('add-todo', this.todo);
            this.todo = '';
        }
    }
}

export const style = `
    {{parent}} .header label{
        top: 15px;
        left: -13px;
    }
`
