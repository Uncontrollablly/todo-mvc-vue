export const template = `
   <footer class="footer">
        <span class="todo-number">{{activeTodosNumber}} items left</span>
        <div class="filters">
            <button :class="{checked: checkedButton ==='all'}" @click="onClick('all')">All</button>
            <button :class="{checked: checkedButton ==='active'}" @click="onClick('active')">Active</button>
            <button :class="{checked: checkedButton ==='completed'}" @click="onClick('completed')">Completed</button>
            <button class="clear-completed" :class="{hide: !hasCompletedTodo}" @click="$emit('clear-completed-todos')">Clear completed</button>
        </div>
    </footer>
`;

export const script = {
    name: 'app-footer',
    props: {'activeTodosNumber': Number, 'hasCompletedTodo': Boolean, 'tag': String},
    data: function () {
        return {
            checkedButton: this.tag,
        }
    },
    methods: {
        onClick: function (tag) {
            this.$emit('show-tag', tag);
            this.checkedButton = tag;
        }
    },
}

export const style = `
    {{parent}}.footer {
        display: flex;
        align-items: center;
    }
    
    {{parent}} .clear-completed {
        position: absolute;
        right: 0px;
    }
    
    {{parent}} button {
        display: inline-block;
        padding: 3px 7px;
        margin: 0 3px;
        border: 1px solid transparent;
        box-sizing: border-box;
    }
    
    {{parent}} button:hover:not(.clear-completed) {
        border: 1px solid rgba(175, 47, 47, 0.1);
    }
    
    {{parent}} button.checked {
        text-shadow: 0 0 black;
        border: 1px solid rgba(175, 47, 47, 0.2);
    }
    
    {{parent}} .hide {
        display: none
    }
`

