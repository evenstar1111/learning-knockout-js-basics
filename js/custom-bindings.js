ko.bindingHandlers.fadeVisible = {
   init: function(element, valueAccessor) {
      var shouldDisplay = valueAccessor();
      shouldDisplay ? $(element).show() : $(element).hide();
   },
   update: function(element, valueAccessor) {
      var shouldDisplay = valueAccessor();
      shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
   }
}

ko.bindingHandlers.starRating = {
   init: function(element, valueAccessor) {
      var options = valueAccessor();
      $(element).addClass('star-rating');
      for (var i = 0; i < 5; i++)
         $('<span/>').addClass('star').appendTo(element);
      
      $("span", element).each(function (index) {
         $(this)
         .hover(
            function () { $(this).prevAll().add(this).addClass('star-rating-hover'); },
            function () { $(this).prevAll().add(this).removeClass('star-rating-hover'); }
         )
         /*** 
          * 
          * options.ratings(): {Number} need be an observable of number data type
          * Need to pass an observable to the ratings property
          * 
          * ***/
         .click(function () { options.ratings(index + 1); });
      });
   },
   update: function(element, valueAccessor) {
      var options = valueAccessor();
      var currentRating = options.ratings();
      $(element).children().each(function(index) {
         if (index < currentRating)
            $(this).addClass('chosen');
         else
            $(this).removeClass('chosen');
      });
   }
}

function Answer(text) {
   this.answerText = text;
   this.points = ko.observable(1);
}

function SurveyViewModel(question, pointsBudget, answers) {
   this.question = question;
   this.pointsBudget = pointsBudget;
   this.answers = $.map(answers, function (text) { return new Answer(text) });
   this.save = function () { alert('To do') };

   this.pointsUsed = ko.computed(function () {
      var total = 0;
      for (var i = 0; i < this.answers.length; i++)
         total += this.answers[i].points();
      return total;
   }, this);
}

ko.applyBindings(new SurveyViewModel("Which factors affect your technology choices?", 10, [
   "Functionality, compatibility, pricing - all that boring stuff",
   "How often it is mentioned on Hacker News",
   "Number of gradients/dropshadows on project homepage",
   "Totally believable testimonials on project homepage"
]));