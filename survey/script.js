$(document).ready(function() {
  $('#surveyForm').on('submit', function(event) {
    event.preventDefault();
    
    const q1 = $('#q1').val();
    const q2 = $('#q2').val();
    const q3 = $('#q3').val();
    
    $('#result1').text(`Favorite color: ${q1}`);
    $('#result2').text(`Age: ${q2}`);
    $('#result3').text(`Favorite hobby: ${q3}`);
    
    $('#results').removeClass('hidden');
  });
});
