module.exports = {
  getDashboard: (req, res) => {
    res.render("dashboard", {
      welcomeMessage: `Welcome to your dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
    var tasks = {};

    var createTask = function (taskText, taskDate, taskList) {
      // create elements that make up a task item
      var taskLi = document
        .querySelector("<li>")
        .classList.add("list-group-item");
      var taskSpan = document
        .querySelector("<span>")
        .classList.add("badge badge-primary badge-pill")
        .text(taskDate);
      var taskP = document
        .querySelector("<p>")
        .classList.add("m-1")
        .text(taskText);

      // append span and p element to parent li
      taskLi.insertAdjacentHTML("beforeend", taskSpan, taskP);

      // check due date
      auditTask(taskLi);

      // append to ul list on the page
      document
        .querySelector("#list-" + taskList)
        .insertAdjacentHTML("beforeend", taskLi);
    };

    var loadTasks = function () {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      // if nothing in localStorage, create a new object to track all task status arrays
      if (!tasks) {
        tasks = {
          toDo: [],
          inProgress: [],
          inReview: [],
          done: [],
        };
      }

      // loop over object properties
      $.each(tasks, function (list, arr) {
        // then loop over sub-array
        arr.forEach(function (task) {
          createTask(task.text, task.date, list);
        });
      });
    };

    var saveTasks = function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    var auditTask = function (taskEl) {
      // get date from task element
      var date = document
        .querySelector(taskEl)
        .querySelector("span")
        .text()
        .trim();

      // convert to moment object at 5:00pm
      var time = moment(date, "L").set("hour", 17);

      // remove any old classes from element
      document
        .querySelector(taskEl)
        .classList.remove("list-group-item-warning list-group-item-danger");

      // apply new class if task is near/over due date
      if (moment().isAfter(time)) {
        document.querySelector(taskEl).classList.add("list-group-item-danger");
      } else if (Math.abs(moment().diff(time, "days")) <= 2) {
        document.querySelector(taskEl).classList.add("list-group-item-warning");
      }
    };

    // enable draggable/sortable feature on list-group elements
    document.querySelector(".card .list-group").sortable({
      // enable dragging across lists
      //connectWith: document.querySelector(".card .list-group"),
      //scroll: false,
      tolerance: "pointer",
      helper: "clone",
      activate: function (event, ui) {
        document.querySelector(this).classList.add("dropover");
        document
          .querySelector(".bottom-trash")
          .classList.add("bottom-trash-drag");
      },
      deactivate: function (event, ui) {
        document.querySelector(this).classList.remove("dropover");
        document
          .querySelector(".bottom-trash")
          .classList.remove("bottom-trash-drag");
      },
      over: function (event) {
        document.querySelector(event.target).classList.add("dropover-active");
      },
      out: function (event) {
        document
          .querySelector(event.target)
          .classList.remove("dropover-active");
      },
      update: function () {
        var tempArr = [];

        // loop over current set of children in sortable list
        document
          .querySelector(this)
          .children()
          .each(function () {
            // save values in temp array
            tempArr.push({
              text: document
                .querySelector(this)
                .querySelector("p")
                .text()
                .trim(),
              date: document
                .querySelector(this)
                .querySelector("span")
                .text()
                .trim(),
            });
          });

        // trim down list's ID to match object property
        var arrName = document
          .querySelector(this)
          .attr("id")
          .replace("list-", "");

        // update array on tasks object and save
        tasks[arrName] = tempArr;
        saveTasks();
      },
    });

    // trash icon can be dropped onto
    document.querySelector("#trash").droppable({
      accept: ".card .list-group-item",
      tolerance: "touch",
      drop: function (event, ui) {
        // remove dragged element from the dom
        ui.draggable.remove();
        document
          .querySelector(".bottom-trash")
          .classList.remove("bottom-trash-active");
      },
      over: function (event, ui) {
        console.log(ui);
        document
          .querySelector(".bottom-trash")
          .classList.add("bottom-trash-active");
      },
      out: function (event, ui) {
        document
          .querySelector(".bottom-trash")
          .classList.remove("bottom-trash-active");
      },
    });

    // convert text field into a jquery date picker
    document.querySelector("#modalDueDate").datepicker({
      // force user to select a future date
      minDate: 1,
    });

    // modal was triggered
    document
      .querySelector("#task-form-modal")
      .addEventListener("show.bs.modal", function () {
        // clear values
        document.querySelector("#modalTaskDescription, #modalDueDate").value;
      });

    // modal is fully visible
    document
      .querySelector("#task-form-modal")
      .addEventListener("shown.bs.modal", function () {
        // highlight textarea
        document.querySelector("#modalTaskDescription").trigger("focus");
      });

    // save button in modal was clicked
    document.querySelector("#task-form-modal .btn-save").click(function () {
      // get form values
      var taskText = document.querySelector("#modalTaskDescription").value;
      var taskDate = document.querySelector("#modalDueDate").value;

      if (taskText && taskDate) {
        createTask(taskText, taskDate, "toDo");

        // close modal
        document.querySelector("#task-form-modal").modal("hide");

        // save in tasks array
        tasks.toDo.push({
          text: taskText,
          date: taskDate,
        });

        saveTasks();
      }
    });

    // task text was clicked
    document
      .querySelector(".list-group")
      .addEventListener("click", "p", function () {
        // get current text of p element
        var text = document.querySelector(this).text().trim();

        // replace p element with a new textarea
        var textInput = document
          .querySelector("<textarea>")
          .classList.add("form-control")
          .val(text);
        document.querySelector(this).replaceWith(textInput);

        // auto focus new element
        textInput.trigger("focus");
      });

    // editable field was un-focused
    document
      .querySelector(".list-group")
      .addEventListener("blur", "textarea", function () {
        // get current value of textarea
        var text = document.querySelector(this).value;

        // get status type and position in the list
        var status = document
          .querySelector(this)
          .closest(".list-group")
          .attr("id")
          .replace("list-", "");
        var index = document
          .querySelector(this)
          .closest(".list-group-item")
          .index();

        // update task in array and re-save to localstorage
        tasks[status][index].text = text;
        saveTasks();

        // recreate p element
        var taskP = document
          .querySelector("<p>")
          .classList.add("m-1")
          .text(text);

        // replace textarea with new content
        document.querySelector(this).replaceWith(taskP);
      });

    // due date was clicked
    document
      .querySelector(".list-group")
      .addEventListener("click", "span", function () {
        // get current text
        var date = document.querySelector(this).text().trim();

        // create new input element
        var dateInput = document
          .querySelector("<input>")
          .attr("type", "text")
          .classList.add("form-control")
          .val(date);
        document.querySelector(this).replaceWith(dateInput);

        // enable jquery ui date picker
        dateInput.datepicker({
          minDate: 1,
          onClose: function () {
            // when calendar is closed, force a "change" event
            document.querySelector(this).trigger("change");
          },
        });

        // automatically bring up the calendar
        dateInput.trigger("focus");
      });

    // value of due date was changed
    document
      .querySelector(".list-group")
      .addEventListener("change", "input[type='text']", function () {
        var date = document.querySelector(this).value;

        // get status type and position in the list
        var status = document
          .querySelector(this)
          .closest(".list-group")
          .attr("id")
          .replace("list-", "");
        var index = document
          .querySelector(this)
          .closest(".list-group-item")
          .index();

        // update task in array and re-save to localstorage
        tasks[status][index].date = date;
        saveTasks();

        // recreate span and insert in place of input element
        var taskSpan = document
          .querySelector("<span>")
          .classList.add("badge badge-primary badge-pill")
          .text(date);
        document.querySelector(this).replaceWith(taskSpan);
        auditTask(document.querySelector(taskSpan).closest(".list-group-item"));
      });

    // remove all tasks
    document
      .querySelector("#remove-tasks")
      .addEventListener("click", function () {
        for (var key in tasks) {
          tasks[key].length = 0;
          document.querySelector("#list-" + key).empty();
        }
        console.log(tasks);
        saveTasks();
      });

    // load tasks for the first time
    loadTasks();

    // audit task due dates every 30 minutes
    setInterval(function () {
      document.querySelector(".card .list-group-item").each(function () {
        auditTask(document.querySelector(this));
      });
    }, 1800000);
  },
};
