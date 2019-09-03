/* 
  react-redux将组件分为UI组件和容器组件，
  UI组件没有state，数据由props提供；
  容器组件带有state
  todolist是一个UI组件，visibletodolist是一个容器组件
*/
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'
// 相当于一个reducer，接收state和action，通过判断action type对state做处理
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
// mapStateToProps负责输入逻辑，即将state映射到 UI 组件的参数（props）；
const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})
// mapDispatchToProps负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
// 接收dispatch，将action dispatch到reducer
/* 
  在项目入口文件index.js中引入了rootReducer（也就是reducer文件夹下的index.js），
  rootReducer里通过combineReducers合并了todo.js里负责添加todo和切换todo状态的reducer以及visibilityFilter.js里的reducer，
  入口文件index.js中调用createStore创建store时传入了rootReducer，
  容器组件VisibleTodoList向UI组建TodoList注入toggleTodo这个回调方法，在这个回调方法中对toggleTodo这个action进行分发，
  分发后会被reducer/todo.js里的reducer处理，具体就是case 'TOGGLE_TODO'，切换完成与否的状态，更新state
  用户点击todo项的时候会更新store里的state
*/
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})
const mapDispatchToProps = function(dispatch) {
  return {
    // 这个toggleTodo是要传入TodoList onClick属性的回调方法
    toggleTodo: function(id) {
      // 这个toggleTodo是action/index.js里定义的toggleTodo这个action，会被dispatch
      return dispatch(toggleTodo(id))
    }
  }
}
/* 
  connect方法将UI组件和容器组件连起来，从UI组件生成容器组件
  connect方法接受两个参数：mapStateToProps和mapDispatchToProps。
  
  
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
