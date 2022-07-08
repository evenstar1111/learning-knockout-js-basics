function Task(data) {
   this.title = ko.observable(data.title);
   this.isDone = ko.observable(data.isDone);
}

function TasksViewModel() {
   var self = this;
   self.tasks = ko.observableArray([]);
   self.newTaskText = ko.observable();
   self.taskTextEmptyError = ko.observable(false);
   self.incompleteTasks = ko.computed(function() {
      return ko.utils.arrayFilter(self.tasks(), function(task) {
         return !task.isDone();
      });
   });

   self.addTask = function() {
      if (!self.newTaskText() || self.newTaskText() === "") {
         self.taskTextEmptyError(true);
         return;
      };
      self.taskTextEmptyError(false);
      self.tasks.push(new Task({ title: self.newTaskText(), isDone: false }));
      self.newTaskText("");
   }

   $.getJSON("http://localhost:3000/tasks", function(allData) {
      console.log(allData);
      var mappedTasks = $.map(allData, function(taskData) { return new Task(taskData) });
      self.tasks(mappedTasks);
   });
}

ko.applyBindings(new TasksViewModel());