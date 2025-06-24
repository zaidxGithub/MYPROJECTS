document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector("#inputField");
  const addButton = document.querySelector("#add-button");
  const addPara = document.querySelector(".taskdiv-para");
  const parentTaskDiv = document.querySelector(".task-div");
  // const nP1=this.documentURIt.querySelector(".check-para");

  loadTasksFromLocalStorage();

  function addDiv(input) {
    console.log("inpout recievd inside the function", input);
    const innertaskDiv = document.createElement("div");
    innertaskDiv.classList.add("taskDiv");

    const checkparaDiv = document.createElement("div");
    checkparaDiv.classList.add("check-para");

    const newPara = document.createElement("p");
    newPara.textContent = `${input}`;
    newPara.classList.add("taskdiv-para", "task3-para");

    const checkparaIconDv = document.createElement("div");
    checkparaIconDv.classList.add("check-para-icon");

    const newImg2 = document.createElement("img");
    newImg2.classList.add("edit-del-todo-box", "deletebox");
    newImg2.src = "delete.png";
    newImg2.alt = "delete";
    newImg2.dataset.action = "delete";

    const completeButton = document.createElement("button");
    completeButton.classList.add("c-d");

    completeButton.dataset.action = "c-d";

    completeButton.textContent = "DUE";

    innertaskDiv.appendChild(checkparaDiv);
    innertaskDiv.appendChild(checkparaIconDv);

    checkparaDiv.appendChild(newPara);

    checkparaIconDv.appendChild(completeButton);
    checkparaIconDv.appendChild(newImg2);

    parentTaskDiv.insertAdjacentElement("beforeend", innertaskDiv);

    removeHeading();

  }

  function addHeading() {
    if (!document.getElementById("blank-heading")) {
      let heading = document.createElement("p");
      heading.id = "blank-heading";
      heading.textContent = "Add Task Folks!!!";
      parentTaskDiv.appendChild(heading);
    
    }
  }

  function removeHeading() {
    let hr = document.getElementById("blank-heading");
    if (hr) {
      hr.remove();
     
    }
  }

  parentTaskDiv.addEventListener("click", function (e) {
    if (
      e.target.getAttribute("data-action") === "delete" &&
      e.target.classList.contains("deletebox")
    ) {
      let parentDiv = e.target.closest(".taskDiv");
      parentDiv.remove();

      if (parentTaskDiv.children.length === 0) {
        addHeading();
       
      }

      saveTasksToLocalStorage();
    }
  });

  parentTaskDiv.addEventListener("click", function (e) {
    if (
      e.target.getAttribute("data-action") === "c-d" &&
      e.target.classList.contains("c-d")
    ) {
      let parentParaDiv = e.target.closest(".taskDiv");
      let np = parentParaDiv.querySelector(".taskdiv-para");

      if (e.target.textContent === "DONE") {
        e.target.textContent = "DUE";
        e.target.style.backgroundColor = " #f43f5e";
        e.target.style.color = "white";
        if (np) {
          np.style.textDecorationLine = "none";
          np.style.textDecorationStyle = "none";
        }
      } else {
        if (np) {
          np.style.textDecorationLine = "line-through";
          np.style.textDecorationStyle = "solid";
        }
        e.target.textContent = "DONE";
        e.target.style.backgroundColor = " rgb(73, 147, 221)";
        e.target.style.color = "black";
      }

      saveTasksToLocalStorage();
    }
  });

  addButton.addEventListener("click", function () {
    let inputFieldValue = inputField.value.trim();
    if (!inputFieldValue) {
      // alert.textContent="<p>Enter the task first!1</p>";
      alert("Add task first !");
    } else {
      addDiv(inputFieldValue);
      inputField.value = " ";
      saveTasksToLocalStorage();

      console.log("user entered ", inputFieldValue);
    }
  });

  function saveTasksToLocalStorage() {
    const taskArray = [];
    parentTaskDiv.querySelectorAll(".taskDiv").forEach((element) => {
      const text = element.querySelector(".taskdiv-para").textContent;
      const status = element.querySelector(".c-d").textContent;

      taskArray.push({ text, status });
    });
    localStorage.setItem("allTasks", JSON.stringify(taskArray));
  }

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("allTasks") || "[]");

    tasks.forEach((element) => {
      addDiv(element.text);

      const allTasks = parentTaskDiv.querySelectorAll(".taskDiv");
      const lastTask = allTasks[allTasks.length - 1];
      const btn = lastTask.querySelector(".c-d");
      const para = lastTask.querySelector(".taskdiv-para");
      if (element.status === "DONE") {
        btn.textContent = "DONE";
        btn.style.backgroundColor = "rgb(73, 147, 221)";
        btn.style.color = "black";
        para.style.textDecorationLine = "line-through";
        para.style.textDecorationStyle = "solid";
      } else {
        btn.textContent = "DUE";
        btn.style.backgroundColor = "#f43f5e";
        btn.style.color = "white";
        para.style.textDecorationLine = "none";
        para.style.textDecorationStyle = "none";
      }
    });
     if(parentTaskDiv.querySelectorAll(".taskDiv").length===0){
  addHeading();
}
  }
});
