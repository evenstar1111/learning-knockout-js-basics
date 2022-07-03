/* View model */
function AppViewModel() {
   this.pageHeading = "Knockout Js study";
   this.firstName = ko.observable("Knockout");
   this.lastName = ko.observable("Js");

   /* Computed properties: combining observable properties */
   /* this.fullName = ko.computed(function() {
      return this.firstName() + " " + this.lastName();
   }, this); */

   /* Decomposing user input */
   this.fullName = ko.pureComputed({
      read: function() {
         return this.firstName() + " " + this.lastName();
      },
      write: function(value) {
         var lastSpacePos = value.lastIndexOf(" ");
         if (lastSpacePos > 0) {
            this.firstName(value.substring(0, lastSpacePos));
            this.lastName(value.substring(lastSpacePos + 1));
         }
      },
      owner: this
   });

   this.makeLastNameUpperCase = function() {
      var currentValue = this.lastName();
      this.lastName(currentValue.toUpperCase());
   }

   this.makeFullNameUpperCase = function() {
      var currentValue = this.fullName();
      this.fullName(currentValue.toUpperCase());
   }

   this.makeFullNameLowerCase = function() {
      var currentValue = this.fullName();
      this.fullName(currentValue.toLowerCase());
   }
}

ko.applyBindings(new AppViewModel());