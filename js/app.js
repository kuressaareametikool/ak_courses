var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AjuiYlqIySuFdDdUYlY1YkNzOWtJSWxVOWwyTS0zWUE",
  worksheet : "1",
  fast : true,
  sync: true
});


/* Modal handler */

$(".thumbnails").on("click", "li", function(event) {
  var id = $(this).data('id'); 
  ds.reset();  
  var data = ds.fetch({ 
    success : function() {
      var data = this.rows(function(row) {
        return row.id === id;
      }).rowByPosition(0);
      
      $.Mustache.load('templates/modal.mustache')
        .done(function () {
          $('#modal').empty().mustache('modal', data).modal('show');        
        })    
      
      }
  });
    
});


/* Type filter handler */

$("#types a").toggle(function () {
  renderResults($(this).data('type'));
  $(this).parent().parent().find('li').removeClass('active');
  $(this).parent().addClass('active');
}, function () {
  renderResults();
  $(this).parent().parent().find('li').removeClass('active');
});


/*  Results rendering */

function renderResults(type) {
  var rows = []
  ds.reset();  
  ds.fetch({ 
    success : function() {    
      ds.rows(function(row) {
          return (type ? row.type == type : true);
      })
      .each(function(row, rowIndex) {
        rows.push(row);
      });

      $.Mustache.load('templates/thumbnail.mustache')
          .done(function () {
            $('.thumbnails').empty().mustache('thumbnail', rows);
      });
    }
  })
};

/* Main app */

renderResults();
