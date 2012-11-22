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

      if ($.url().param("v") == 1) {
        m('.span8','course', data);
        $('.span3').empty();                
       } else {
          $("#modal").empty()
          m('#modal', 'modal', data)
          $("#modal").modal('show');        
      }          
      }
    })   
});


/* Modal click handler */

$("#modal").on("click", 'a', function(event) {
  var id = $(this).data("id"); 
  ds.reset();  
  ds.fetch({ 
    success : function() {
      var data = ds.rows(function(row) {
        return row.id === id;
      }).rowByPosition(0);
        m('.span8', 'course', data);
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
      $('.thumbnails').empty();
      m('.thumbnails', 'thumbnail', rows, 'append');

    }
  })
};

function m(selector, template, data, method) {
  $.Mustache.load('templates/' + template + '.mustache')
     .done(function () {
       $(selector).mustache(template, data, {method: (method || "html")});        
     })           
}

/* Main app */

  renderResults();