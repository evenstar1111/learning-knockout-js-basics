function WebmailViewModel() {
   // Data
   var self = this;
   self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
   self.choosenFolderId = ko.observable();
   self.choosenFolderData = ko.observable();

   self.goToFolder = function( folder ) {
      self.choosenFolderId( folder );
      fetch('http://localhost:3000/mails-'+folder.toLocaleLowerCase())
         .then(response => response.json())
         .then(data => self.choosenFolderData({mails: data}));
   }

};

ko.applyBindings( new WebmailViewModel() );