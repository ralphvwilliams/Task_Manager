//The title must not be empty and ,must not exceed 12 character
//The descrioption must not be empty and ,must not exceed 20 character
//Display appropriate Validation warnings
//When you click on the check icon, crossing the title and description || make the font colour gray
//Delete/trash icon must delete a task from the table
//Increase/decrease the task count anytime it changes in value and display it

let title = document.getElementById("title");
let description = document.getElementById("exampleFormControlTextarea1");
let taskCount = 0;
let form = document.getElementById("form");
let saveBtn = document.getElementById("save");
let trashBtn = document.getElementById("trash1");
let successBtn = document.getElementById("success1");
// console.log(successBtn);
// console.log(trashBtn);
let task = document.getElementById("task1");
let taskContent = document.getElementById("task-content1");
let taskBody = document.getElementById("tbody");
let tasks = [];
let cart = document.getElementById("cart");
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

function addToTasks() {
  const newTask = new Task(title.value, description.value);
  tasks.push(newTask);
}

function titleValidator() {
  let warnings = document.getElementsByClassName("titleWarning");
  if (title.value == "" || title.value.length > 12) {
    if (warnings.length < 1) {
      let p = document.createElement("p");
      p.setAttribute("class", "titleWarning");
      p.setAttribute("id", "titlewarning");
      form.insertBefore(p, title.nextSibling);
      p.innerHTML = "Title must not be empty and cannot exceed 12 characters";
      p.style.color = "red";
    }
    return 0;
  }
  return 1;
}

function descriptionValidator() {
  let subWarnings = document.getElementsByClassName("subWarning");
  if (description.value == "" || description.value.length > 20) {
    if (subWarnings.length < 1) {
      let p = document.createElement("p");
      p.setAttribute("class", "subWarning");
      p.setAttribute("id", "subwarning");
      form.insertBefore(p, description.nextSibling);
      p.innerHTML =
        "Description must not be empty and cannot exceed 20 characters";
      p.style.color = "red";
    }
    return 0;
  }
  return 1;
}

saveBtn.addEventListener("click", (event) => {
  event.preventDefault();
  titleValidator();
  //   console.log(titleValidator());
  descriptionValidator();
  //   console.log(descriptionValidator());
  let titleWarning = document.getElementById("titlewarning");
  let warnings = document.getElementsByClassName("titleWarning");
  if (titleValidator() == 1) {
    if (warnings.length > 0) {
      titleWarning.style.display = "none";
    }
  } else {
    titleWarning.style.display = "block";
  }
  let subwarning = document.getElementById("subwarning");
  let subWarnings = document.getElementsByClassName("subWarning");
  if (descriptionValidator() == 1) {
    if (subWarnings.length > 0) {
      subwarning.style.display = "none";
    }
  } else {
    subwarning.style.display = "block";
  }

  if (descriptionValidator() == 1 && titleValidator() == 1) {
    addToTasks();
    tbody.innerHTML += `<tr id="trow${taskCount}" class = "trow">
  <th scope="row" id="row${taskCount}">${taskCount + 1}</th>
  <td id="title${taskCount}">${tasks[taskCount].title}</td>
  <td id="description${taskCount}">
    ${tasks[taskCount].description}
  </td>
  <td>
    <div class="actions d-flex justify-content-between">
    <div class="trashClass" id="trash${taskCount}">
      <i
        class="fas fa-trash text-danger mx-2"
      ></i>
      </div>
      <div class="successClass" id="sucess${taskCount}">
      <i
        class="fas fa-check text-success mx-2"
      ></i>
    </div>
    </div>
  </td>
</tr>`;
    taskCount += 1;

    cart.innerHTML = taskCount;
  }
  let divs = document.getElementsByClassName("successClass");
  let trow = document.getElementsByClassName("trow");
  let deletes = document.getElementsByClassName("trashClass");
  for (let button in divs) {
    divs[button].addEventListener("click", (event) => {
      event.preventDefault();
      let divTitle = document.getElementById(`title${button}`);
      let divDesc = document.getElementById(`description${button}`);
      let divRow = document.getElementById(`row${button}`);
      let divParent = document.getElementById(`trow${button}`);
      //   divTitle.style.textDecoration = "line-through";
      //   divDesc.style.textDecoration = "line-through";
      //   divRow.style.textDecoration = "line-through";
      trow[button].style.textDecoration = "line-through";
      trow[button].style.color = "grey";
      console.log(33);
      if (taskCount != 0) {
        taskCount -= 1;
        cart.innerHTML = taskCount;
      }
    });
  }

  for (let del in deletes) {
    deletes[del].addEventListener("click", (event) => {
      event.preventDefault();
      console.log(666);
      if (trow[del].style.textDecoration == "line-through") {
        taskBody.removeChild(trow[del]);
      } else {
        taskBody.removeChild(trow[del]);
        taskCount -= 1;
        cart.innerHTML = taskCount;
      }
    });
  }
});
