class App {
  constructor(){
    this._tracker = new CalorieTracker();
    document.getElementById('meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));
    document.getElementById('workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
    document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
    document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

  }

  _removeItem(type, e){
    console.log(e);
    console.log('helo here')
    if(e.target.classList.contains('delete') | e.target.classList.contains('fa-xmark')){
      console.log(e.target)
      const id = e.target.closest('.card').getAttribute('data-id');
      console.log(id);
      const item = e.target.closest(".card-body")
      if(type === 'meal'){
        this._tracker.removeMeal(id);
      } else if (type === 'workout'){
        this._tracker.removeWorkout(id);
      }
      console.log(item)
      item.remove(); // This takes item out of the dom
      this._tracker._render();
    }
  }

  _newItem(type, e){
    e.preventDefault();
    console.log(e)
    // Without binding this, the this keyword would refer to the form element (the element it is on)
    // With bind this is the App instance
    console.log(this)
    const name = document.getElementById(`${type}-name`).value;
    const calories = document.getElementById(`${type}-calories`).value;
    if (name === '' || calories === ''){
      alert('Please fill in the fields');
      return;
    }
    let item
    if(type === 'meal'){
      item = new Meal(name, +calories); // Putting a plus sign inf front of calories converts it to a number!! Wild
      this._tracker.addMeal(item);

    } else if (type === 'workout'){
      item = new Workout(name, -calories); // Putting a plus sign inf front of calories converts it to a number!! Wild\    this._tracker.addMeal(meal);
      this._tracker.addWorkout(item);
    }
    document.getElementById(`${type}-name`).value = '';
    document.getElementById(`${type}-calories`).value = '';

    this._addItemToDom(type, item);
    // Bootstrap not working
    // const collapseMeal = document.getElementById('collapse-meal');
    // const bsCollapseMeal = new bootstrap.Collapse(collapseMeal, {
    //   toggle: true
    // });
  }

  _addItemToDom(type, item){

    console.log(item.id);
    console.log('helo world');
    const element = document.createElement('div');
    element.setAttribute('data-id', item.id);
    element.classList.add('card', 'my-2');
    // item.setAttribute('data-id', `${type}-${name}`);
    element.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${item.name}</h4>
        <div
          class="fs-1 bg-${type === 'meal' ? 'primary' : 'secondary'} text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${item.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>`
    document.getElementById(`${type}-items`).appendChild(element);
  }
}

class CalorieTracker {
  constructor(){
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesTotal();
    this._displayCaloriesLimit()
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining()
    this._updateProgressBar();
  }

  // Public methods

  addMeal(meal){
    this._meals.push(meal);
    const newTotalCalories = this._totalCalories + meal.calories;
    this.setTotalCalories(newTotalCalories);
    this._render(); // As this is not a "reactive" framework, we need to manually call the render method
  }

  addWorkout(workout){
    this._workouts.push(workout);
    const newTotalCalories = this._totalCalories - workout.calories;
    this.setTotalCalories(newTotalCalories);
    this._render();
  }

  setWorkouts(workouts){
    this._workouts = workouts;
  }

  setMeals(meals){
    this._meals = meals;
  }

  setTotalCalories(calories){
    this._totalCalories = calories;
  }

  removeMeal(id){
    console.log(id)
    console.log(this._meals)
    const meal = this._meals.find(meal => meal.id == id);
    const res = this._meals.filter(meal => meal.id !== id);
    const totalCaloriesUpdated = this._totalCalories - meal.calories;
    this.setMeals(res);
    this.setTotalCalories(totalCaloriesUpdated);

  }

  removeWorkout(id){
    const workout = this._workouts.find(workout => workout.id == id);
    const res = this._workouts.filter(workout => workout.id !== id);
    this.setWorkouts(res);
    const totalCaloriesUpdated = this._totalCalories + workout.calories;
    this.setTotalCalories(totalCaloriesUpdated);
  }

  // Private methods

  _displayCaloriesLimit(){
    const caloriesLimit = document.querySelector('#calories-limit');
    caloriesLimit.textContent = this._calorieLimit;
  }

  _displayCaloriesTotal(){
    console.log('displaying calories total')
    const caloriesTotal = document.querySelector('#calories-total');
    caloriesTotal.textContent = this._totalCalories;
  }

  _displayCaloriesConsumed(){
    const caloriesConsumed = document.querySelector('#calories-consumed');
    const consumed = this._meals.reduce((acc, meal) => acc + meal.calories, 0);
    caloriesConsumed.textContent = consumed;
  }

  _displayCaloriesBurned(){
    const caloriesBurned = document.querySelector('#calories-burned');
    const burned = this._workouts.reduce((acc, workout) => acc + workout.calories, 0);
    caloriesBurned.textContent = burned;
  }

  _displayCaloriesRemaining(){
    const caloriesRemaining = document.querySelector('#calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemaining.textContent = remaining;
    if(remaining < 0){
      caloriesRemaining.parentElement.classList.add('bg-danger');
    } else {
      caloriesRemaining.parentElement.classList.remove('bg-danger');
    }
  }

  _updateProgressBar(){
    const progress = document.querySelector('#calorie-progress');
    const percentage = Math.floor((this._totalCalories / this._calorieLimit) * 100);
    progress.style.width = `${percentage}%`;
    if(percentage > 100){
      progress.classList.add('bg-danger');
    }
  }

  _render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._updateProgressBar()
  }

}

class Meal {
  constructor(name, calories){
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}



class Workout {
  constructor(name, calories){
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}



// console.log(tracker);
const app = new App();
const tracker = new CalorieTracker();

// const meal1 = new Meal('Lunch', 600);
// const meal2 = new Meal('Lunch', 6000);

// const run = new Workout('Run', 300);
// tracker.addMeal(meal1);
// tracker.addMeal(meal2)
// tracker.addWorkout(run);
