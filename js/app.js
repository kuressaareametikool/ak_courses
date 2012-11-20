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

$.getJSON('data/data.json', function(data) {

$.Mustache.load('templates/thumbnail.mustache')
    .done(function () {
      if (type) { 
      var filteredData = [];
      for (var i=0; i < data.length; i++) {
        if (data[i].type == type) {
          filteredData.push(data[i]);
        }
      }
      console.log(filteredData);
      
      }
      $('.thumbnails').empty().mustache('thumbnail', (filteredData || data));
});
});
};