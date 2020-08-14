export const template = `
    <section class="main">
        <ul class="todo-list">
            <li 
                class="todo" 
                v-for="item of displayTodos"
                :key="item.id" 
                :class="{completed: item.state}"
            >
                <div class="view">
                    <input type="checkbox" v-model="item.state">
                    <input
                        type="text"
                        readonly="readonly"
                        class="edit-todo"
                        :class="{editing: item.editing}"
                        v-model="item.text"
                        @blur="finishEditTodo($event, item)"
                        @dblclick="editTodo($event, item)"
                        @mousedown.prevent
                    >
                    <button class="destroy" @click="deleteTodo(item)"></button>   
                </div>
            </li>
        </ul>
    </section>
`;

export const script = {
    name: 'app-content',
    props: ['displayTodos'],
    data: function () {
        return {
        }
    },
    methods: {
        deleteTodo: function (todo) {
            this.$emit('delete-todo', todo);
        },
        finishEditTodo: function (event, todo) {
            event.target.readOnly = true;
            todo.editing = false;
        },
        editTodo: function (event, todo) {
            event.target.readOnly = false;
            event.target.focus();
            todo.editing = true;
        }
    },
}


export const style = `
 {{parent}} .edit-todo {
    height: 100%;
    width: 70%;
    margin-left: 10px;
    border: none;
    outline: none;
    box-sizing: border-box;
 }
 
 {{parent}} .view {
    height: 58px;
    display: flex;
    align-items: center;
 }
 
 {{parent}} .edit-todo.editing {
    border: 1px solid #ccc;
    outline: 1px solid blue;
 }
 
 {{parent}} [type=checkbox] {
    width: 45px;
    height: 45px;
 }
`;


