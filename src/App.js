/**
 * Features:
 * Throughout the day, users are free to add tasks to a task list that is locked
 * (no deletes, swiped rights, custom sorting enabled, if no time scope is set, the default is one day)
 * The Swipe Left/Right will also be a locked feature that becomes available towards the end of the day 
 * (users will also have a chance to edit time limits within the window of time they process their tasks)
 * If the user does not process their tasks, all will be swiped left by default
 * Tasks that are continually swiped left will gradually appear more unpleasant (as incentive to remove them)
 */

import {useState} from 'react';
import "./App.css";

function TodolistRow({todoName}) {
  return (
    <tr>
      <td>
        <button>
          <form>
            <input type="checkbox">
            </input>
            <label>
              {todoName}
            </label>
          </form>
        </button>
      </td>
    </tr>
  );
}

function TodolistCategoryRow({category}) {

  return (
    <tr>
      <th>
        {category}
      </th>
    </tr>
  );
}

function TodolistTable({todos, stats, onTodosChange, onStatsChange}) {

  const rows = [];
  let lastCategory = null;

  todos.forEach((todo) => {
    let category;
    if(todo.swipes === 0) {
      category = "New:"
    } else if(todo.swipes <= 2) {
      category = "Recent:"
    } else if(todo.swipes <= 4) {
      category = "Swiped Left 3 Times:"
    } else {
      category = "Swiped Left 5 Times:"
    }
    if(category !== lastCategory) {
      rows.push(
        <TodolistCategoryRow 
          category={category}
          key={}/>
      );
      lastCategory = category;
    }
    rows.push(
      <TodolistRow
        todoName = {todo.name} />
    );
  });

  return (
    <div>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  ); 
}

function UtilitiesBar({stats, todos, setTodos, setStats}) {
  const [showDaily, setShowDaily] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);

  function handleDayClick() {
    setShowDaily(!showDaily);
  }
  function handleWeekClick() {
    setShowWeekly(!showWeekly);
  }
  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      let input = event.target.value;
      console.log(input); // debug
      let repeat = todos.forEach((todo) => {
        if(input === todo) {
          return false;
        }
      });
      if(!repeat) {
        setTodos(
          [{
            name: input, 
            swipes: 0, 
            id: this.name,
          }].concat(todos)
        );
      } else {
        alert("No duplicate todos allowed");
      }      
    }
  }

  return (
    <div className='ubuntu-font'>
      <button onClick={handleDayClick}>Daily Summary</button>
      {showDaily && <p>Tasks Completed: {stats.completedToday}</p>}

      <button onClick={handleWeekClick}>Weekly Summary</button>
      {showWeekly && <p>Tasks Completed: {stats.completedThisWeek}</p>}

      <form>
        <input 
          type="text" 
          placeholder="New Todo..." 
          onKeyDown={handleKeyDown}></input>
      </form>
      <button >Check Up</button>
      <h3>Left/Right Ratio: {stats.swipedLeft} : {stats.swipedRight}</h3>
    </div>
  );
}

function TodolistPage() {
  const [todos, setTodos] = useState(
    [
      {name: "todo 1", swipes: 0, id: this.name},
      {name: "todo 6", swipes: 1, id: this.name}, 
      {name: "todo 7", swipes: 1, id: this.name},
      {name: "todo 3", swipes: 1, id: this.name},
      {name: "todo 4", swipes: 3, id: this.name},
      {name: "todo 2", swipes: 4, id: this.name},
      {name: "todo 5", swipes: 5, id: this.name},
    ]
  );
  const [stats, setStats] = useState(
    {
      swipedRight: 0,
      swipedLeft: 0,
      completedToday: 0,
      completedThisWeek: 0
    }
  );

  return (
    <div>
      <UtilitiesBar 
        stats={stats}
        todos={todos}
        onTodosChange={setTodos}
        onStatsChange={setStats} />
      <TodolistTable 
        todos={todos}
        stats={stats}
        setTodos={setTodos}
        setStats={setStats} />   
    </div>
  );
}

function App() {
  return (
    <TodolistPage/>
  );
}

export default App;