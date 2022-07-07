function WebmailViewModel() {
   // Data
   var self = this;
   self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
   self.choosenFolderId = ko.observable();
   self.choosenFolderData = ko.observable();
   self.choosenMailData = ko.observable(null);

   self.goToFolder = function( folder ) {
      location.hash = folder;
   }

   self.goToMail = function( mail ) {
      location.hash = mail.folder + '/' + mail.id;
   }

   // self.goToFolder( self.folders[0] );

   Sammy(function() {
      this.get('#:folder', function() {
         self.choosenMailData(null);
         self.choosenFolderId( this.params.folder );

         fetch('http://localhost:3000/mails-'+this.params.folder.toLocaleLowerCase())
            .then(response => response.json())
            .then(data => {
               self.choosenFolderData({mails: data});
            });
      });

      this.get('#:folder/:mailId', function() {
         self.choosenFolderId( this.params.folder );

         fetch('http://localhost:3000/mails-'+this.params.folder.toLocaleLowerCase())
            .then(response => response.json())
            .then(data => {
               self.choosenFolderData({mails: data});
            });

         fetch('http://localhost:3000/mails-'+this.params.folder.toLocaleLowerCase()+'?id='+this.params.mailId+'&folder='+this.params.folder)
            .then(response => response.json())
            .then(data => {
               self.choosenMailData(data[0]);
            });
      });

      this.get('', function() { this.app.runRoute('get', '#Inbox') });
   }).run();
};

ko.applyBindings( new WebmailViewModel() );