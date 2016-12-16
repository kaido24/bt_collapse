﻿(function(){
  CKEDITOR.plugins.add('bt_collapse', {
      lang: 'en',
      requires: 'widget,dialog',
      icons: 'bt_collapse',
      init: function(editor) {
       var lang = editor.lang.bt_collapse;
       CKEDITOR.dialog.add('bt_collapse',  this.path + 'dialogs/bt_collapse.js');
      // CKEDITOR.scriptLoader.load( this.path + '/accordion-helpers.js');
       editor.addContentsCss( this.path + 'styles/editor.css');
       // Add widget
       editor.ui.addButton('bt_collapse', {
         label: lang.createAccordion,
         command: 'bt_collapse',
         icon: this.path + 'images/icon.png'
       });
       editor.widgets.add('bt_collapse',
         {
           allowedContent: 'div(!*);div[data-*];div[aria-*];div[role];div[id]',
           requiredContent: 'div(panel-default)',
           parts: {
             bt_collapse: 'div.panel-default',
           },
           template:
                   '<div class="panel panel-default">' +
                   '</div>',
          // dialog: 'bt_collapse',
          // Before init.
           upcast: function(element) {
             return element.name == 'div' && element.hasClass('panel-default');
           },
           // initialize
           // Init function is useful after copy paste rebuild.
           init: function() {
             this.createEditable();
           },
           // Prepare data
           data: function() {
               var row = this.parts['bt_collapse'];
               if (row.$.children.length < 1) {
                  var date = new Date();
                  this.createPanel(row, date.getTime());
                  this.createEditable();
               }
             
           },
          
           //Helper functions.
           // Create grid
           createPanel: function(row, rowNr) {
             var content = 
           //  '<div class="panel panel-default">' +
              '<div class="panel-heading" role="tab" id="heading-' + rowNr + '">' +
                '<div class="panel-title">' +
                  '<div class="accordion-title" role="button" data-toggle="collapse" data-target="#collapse-' + rowNr + '" aria-expanded="false" aria-controls="collapse-' + rowNr + '">Title</div>' +
                '</div>' +
              '</div>' +
              '<div id="collapse-' + rowNr + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-' + rowNr + '">'+ 
                  '<div class="panel-body">text' +
                  '</div>' +
             //     '</div>' + 
              '</div>';
             row.appendHtml(content);
             //this.createEditable(rowNr);
           },
           // Create editable.
          createEditable: function() {
             this.initEditable( 'title', {
                  selector: '.accordion-title'
              });
             this.initEditable( 'content', {
                  selector: '.panel-body'
              });
            },
          }
        );
      }
    }
  );

})();
