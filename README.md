# Frontend Mentor - Multi-step form solution

- This is my solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ).
- After watching few Vue.js basics tutorials, I wanted to do a project to apply some concepts I learned, before I continue with the tutorials.
- I did not pay (a lot of) attention to responsiveness, which is something that could be improved in the future, as well as a form validation.
- **Update**: I wanted to do a refactoring of the code. I am aware that my new solution is certainly not the best but I do like learning this way.

## The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

## What I learned

The Vue concepts that were applied in this project are:

- Options API
- Creating Vue Components
- Props
- Data bindings
- List rendering
- Conditional rendering
- Dynamic Classes (css)
- Emitting custom events
- Computed Properties
- Very simple form and using v-model for two-way data binding
- The lifecycle hook mounted()

## Refactoring

### My thought process
- I put some thought into how to manage my data. I wanted to have a separate file for my static data (array of plans, array of addons...) . For this purpose I used **reactive()** to create a reactive object inside new store.js file. This object then can be imported where it’s needed.
- In App.vue I wanted to have some kind of “global” data that is being passed to other components and that enables interaction with my project (moving between steps, a user making selections...) . I also wanted to have all the data made by a user in one place hence inside App.vue I created userSelection object.

### What I learned
-  I learned an important difference between **computed** properties and **watchers**. Computed getter functions should only return a value and be free of side effects. If I need side effects in reaction to reactive state changes I should use watchers.
- When watching for ‘userSelection.addonsList’, the array addonsList stays the same, only the elements inside of it change. To be able to watch for these changes we need to use **deep: true**. If we compare the new value that we get with the old one using the strict equality we get true. I believe this has to do with **reference values** of arrays.
- When thinking about **reactivity** it's important to recognize what is our reactive state and what should happen when that state changes (side effects).
- Instead of using watchers when selected plan or selected addons change I probably could have written the necessary code when user interaction happens, that is when click event is emitted in App.vue


## Useful resources

- [Vue.js 3 tutorials by Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1)
- https://michaelnthiessen.com/how-to-watch-nested-data-vue
- https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
