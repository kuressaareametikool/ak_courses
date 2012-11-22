var ds = new Miso.Dataset({
  importer : Miso.Dataset.Importers.GoogleSpreadsheet,
  parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
  key : "0AjuiYlqIySuFdDdUYlY1YkNzOWtJSWxVOWwyTS0zWUE",
  worksheet : "1",
  fast : true,
  sync: true,
})
    
/* Thumbnail handler */

$(".thumbnails").on("click", "li", function(event) {
  var id = $(this).data('id'); 
  ds.reset();  
  var data = ds.fetch({ 
    success : function() {
      var data = this.rows(function(row) {
        return row.id === id;
      }).rowByPosition(0);
        m('.main','course', data);
      }
    })   
});

$(".thumbnails").on("mouseover", "li", function(event) {
   $(this).find(".description_short").removeClass('hide')
});

$(".thumbnails").on("mouseout", "li", function(event) {
  $(this).find(".description_short").addClass('hide')
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
          return (type ? (row.type == type || row.education == type) : true) && row.title;
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