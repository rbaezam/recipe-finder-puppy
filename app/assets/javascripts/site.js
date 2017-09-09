$(document).ready(function() {
  $('#searchButton').click(function() {
    var term = $('#searchText').val();

    if (term.trim() === '') {
      result;
    }

    $('#loadingIndicator').show();
    $('#resultsTable > tbody').empty();
    $.post('/search', { term: term }, function(data) {
      $('#errorMessage').hide();

      if (data === undefined || data === null) {
        $('#errorMessage').html('<div class="alert alert-danger" role="alert">There was an error in the search request!</div>');
        $('#errorMessage').show();
        $('#loadingIndicator').hide();
        return;
      }

      if (data.count === 0) {
        $('#errorMessage').html('<div class="alert alert-warning" role="alert">The search returned no results!</div>');
        $('#errorMessage').show();
        $('#loadingIndicator').hide();
        return;
      }

      $('#resultsTable').show();
      $.each(data, function(index, element) {
        $('#resultsTable > tbody:last-child').append(
          '<tr>'
          + '<td><a href="' + element.href + '" target="_blank">' + element.title + '</a></td>'
          + '<td>' + element.ingredients + '</td>'
          + '<td><img src="' + element.thumbnail +'"/></td>'
          + '</tr>'
        );
      });
      $('#loadingIndicator').hide();
    }).fail(function() {
      $('#errorMessage').html('<div class="alert alert-danger" role="alert">There was an error in the search request!</div>');
      $('#errorMessage').show();
      $('#loadingIndicator').hide();
    });
  });
});
