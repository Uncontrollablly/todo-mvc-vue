export const template = `
   <header class="header">
        <h1>{{ title }}</h1>
        <input
                autofocus="autofocus"
                autocomplete="off"
                placeholder="What needs to be done?"
                class="new-todo"
                v-model="todo"
                @keyup.enter="addTodo"
        >
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
    </header>
`;

export const script = {
    name: 'app-header',
    props: ['toggle'],
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
