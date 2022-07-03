function SeatReservation(name, initialMeal) {
   var self = this;
   self.name = name;
   self.meal = ko.observable(initialMeal);

   self.formattedPrice = ko.computed(function() {
      var price = self.meal().price;
      return price ? "₹" + price.toFixed(2) : "N/A";
   });
}

function ReservationsViewModel() {
   var self = this;

   // Non-editable catalog data - would come from the server
   self.availableMeals = [
      { mealName: "Standard (rice)", price: 0 },
      { mealName: "Basic 2 (soya bean)", price: 15 },
      { mealName: "Premium (daal)", price: 34 },
      { mealName: "Ultimate (fried potato)", price: 290 },
      { mealName: "Prime (roasted potato)", price: 415 },
      { mealName: "Ultimate 2 (fresh onion)", price: 650 },
   ];

   // Editable data
   self.seats = ko.observableArray([
      new SeatReservation("Steve", self.availableMeals[2]),
      new SeatReservation("Bert", self.availableMeals[1])
   ]);

   self.totalSurcharge = ko.computed(function() {
      var totalPrice = 0;
      for (let i = 0; i < self.seats().length; i++)
         totalPrice += self.seats()[i].meal().price;
      return totalPrice;
   });

   self.addSeat = function() {
      if (self.seats().length >= 5) return;
      self.seats.push(new SeatReservation("", self.availableMeals[0]));
   }

   self.editSeat = function(seat) {
      console.log(seat);
   }

   self.removeSeat = function(seat) {
      self.seats.remove(seat);
   }
}

ko.applyBindings(new ReservationsViewModel());