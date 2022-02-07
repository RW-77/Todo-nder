import {useState} from 'react';
import "./App.css";

function TodolistRow({todo}) {
  return (
    <tr>
      <td>
        <button>
          <form>
            <input type="checkbox">
              {todo.name}
            </input>
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

function TodolistTable({todos}) {
  const rows = [];
  let lastCategory = null;

  todos.map((todo) => {
    let category;
    if(todo.swipes == 0) {
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
          category={category}/>
      );
      lastCategory = category;
    }
    rows.push(
      <TodolistRow
        todo = {todo.name}/>
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

function UtilitiesBar({stats}) {
  return (
    <div>
      <button>Daily Summary</button>
      <button>Weekly Summary</button>
      <form>
        <input type="text" placeholder="New Todo..."></input>
      </form>
      <button>Check Up</button>
      <h3>Left/Right Ratio: {stats[swipedLeft]}:{stats[swipedRight]}</h3>
    </div>
  );
}

function TodolistPage({todos, stats}) {
  return (
    <div>
      <UtilitiesBar stats={stats}/>
      <TodolistTable todos={todos}/>
    </div>
  );
}

const todoObjects = [
  {name: "todo 1", swipes: 1},
  {name: "todo 6", swipes: 1},
  {name: "todo 7", swipes: 1},
  {name: "todo 3", swipes: 1},
  {name: "todo 4", swipes: 3},
  {name: "todo 2", swipes: 4},
  {name: "todo 5", swipes: 5},

];

const stats = {
  swipedRight: 0,
  swipedLeft: 0,
  completedToday: 0,
};

function App() {
  return (
  <TodolistPage 
    todos={todoObjects}
    stats={stats}/>
  );
}

export default App;