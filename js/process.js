var application = function() {
  // basic variables
  var apiKey   = '96e769aaf4e0ffe7112b1cc2cbdd9db9';
  var basePath = 'https://api.themoviedb.org/3';
  var genresEP = basePath + '/genre/movie/list?api_key=' + apiKey + '&language=en-US';

  var imageBasePath = 'http://image.tmdb.org/t/p/w500';
  // var actorPath = basePath + '/search/person?api_key=' + apiKey
  
  // buttons and input fields
  var button = $('.searchbutton');
  var select = $('.genres-select');
  var runtimeSelect = $('.runtime-select')
  var yearSelect = $('.year-select')
  var ratingSelect = $('.rating-select')
  var list   = $('.movie-list');

  loadGenres(); 
  button.on('click', search); // if button is clicked, do the seaaarch

   
  function loadGenres() {
    $.ajax(genresEP).then(fillGenres); // line 38
  };
  
//  function fillGenres(response) {
//   response.genres.map(function(item) {
 //     var option = $('<option />').val(item.id).text(item.name);

  //    
  //    select.append(option);
  //    console.log(select.val())
  //  });
 // };

function fillGenres(response) {
    response.genres.map(function(item) {
      var option = $('<option />').text(item.name).val(item.id);



      select.append(option);
      //console.log(select[0])
    });
  };


 
  
 // le search
  function search() {
    var genreID = $("#input-26").val();
    var yearID = yearSelect.val();
    var voteID = ratingSelect.val();
    var runtimeID = runtimeSelect.val();
    var movieByGenreEP = basePath + '/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&primary_release_year=' + yearID + '&vote_average.gte=' + voteID +'&with_genres=' + genreID + '&with_runtime.lte=' + runtimeID;
    console.log(movieByGenreEP)
    
    $.ajax(movieByGenreEP).then(listMoviesByGenre); // Line 58
  };
  
  // le movies
  function listMoviesByGenre(response) {
    var html = '';
    
    response.results.map(function(movie) {
      html += [
        '<li>',
          '<img src="' + imageBasePath + movie.poster_path + '" width="300" /> ',
          '<strong>' + movie.original_title +  '</strong>',
        '</li>'
      ].join('');
    });
    
    list.html(html);
  }
};

$(application); // Initilize app








// function successCB(data) {
//     var obj = $.parseJSON(data);
//     obj.results.slice(0,4).forEach(function(item){
//      var url = theMovieDb.common.images_uri + item.poster_path;
//      var img = $(document.createElement("img"));
//        img.attr('src', url);
//        img.appendTo(".pics")
//     })
// };

// function errorCB(data) {
//             console.log("Error callback: " + data);
//     };


// function getGenre(genreAPI, genre)
// {
//   $.getJSON(genreAPI, function(data)
//     {$.map(data.genres, function(obj){
//         if (obj.name == genre){
//           genreIndex = obj.id;
//           console.log(genreIndex);
//         }
//     }); console.log(genreIndex)
//   }, 
//   ); 
// } 


// $(document).ready(function(){
//     $("#searchbutton").click(function(){
//       var actor = $('#input-25').val();
//       var genre = $('#input-26').val();
//       var rating = $('#input-27').val();
//       var year = $('#input-28').val();
//       console.log(actor + genre + rating + year)
//       getGenre(genreAPI, genre)
//       // console.log(genreIndex)
//       // theMovieDb.discover.getMovies({'year': year , 'with_genres' : indexGenre }, successCB, errorCB)

//     })


//     });

// }
