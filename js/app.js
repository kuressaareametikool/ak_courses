showResults();

$("#types a").toggle(function () {
  showResults($(this).data('type'));
  $(this).parent().parent().find('li').removeClass('active');
  $(this).parent().addClass('active');
}, function () {
  showResults();
  $(this).parent().parent().find('li').removeClass('active');
});


function showResults(type) {

  var ds = new Miso.Dataset({
    importer : Miso.Dataset.Importers.GoogleSpreadsheet,
    parser : Miso.Dataset.Parsers.GoogleSpreadsheet,
    key : "0AjuiYlqIySuFdDdUYlY1YkNzOWtJSWxVOWwyTS0zWUE",
    worksheet : "1",
    fast : true
  });

  var rows = []

  ds.fetch({ 
    success : function() {
     
      ds.where({
        rows: function(row) {
          return (type ? row.type == type : true);
        }
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