
function loadData(subfunc) {
  var template = $("#data-template").html();
  $.getJSON("data.json", function (data) {
    document.title = data.metadata.title + " | metaBLR";
    $("#divH1").append("<h1>" + data.metadata.title + "</h1>");
    subfunc(data);   
    var html = Mustache.render(template, data);
    $("#divData").append(html);        
  });
}

// https://metablr.github.io/authors.json

/*        
        console.log(json);
        var data = JSON.parse(json);
         for (var i = 0; i < data.authors.length; i++) {
          console.log(data.authors[i].lastName);
        }
        var items = data.authors;
        items.forEach(function(item) {
          console.log(item);
        });
        $.each(data, function (key, value) {
          console.log(key+' '+value);
        });
*/

function getCollectionTitle(path) {
  var title = "";
  $.ajax({
    dataType: 'json',
    url: path + "/data.json",
    async: false,
    success: function (data) {
      title = data.metadata.title;
    }
  });  
  return title;
}

// TABS

function openTab(evt, tabName) {
  var i, tabpanels, tablabels;
  tabpanels = document.getElementsByClassName("tab-panel");
  for (i = 0; i < tabpanels.length; i++) {
    tabpanels[i].style.display = "none";
  }
  tablabels = document.getElementsByClassName("tab-label");
  for (i = 0; i < tablabels.length; i++) {
    tablabels[i].className = tablabels[i].className.replace(" active", "");
  }
  // $("#"+tabName).show(500);
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  document.getElementById(tabName).scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"}); 
}

// SCROLLER

$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('.top-scroller').fadeIn('slow');
    } else {
      $('.top-scroller').fadeOut('slow');
    }
  });
  
  $('.top-scroller').click(function() {
    $('html, body').animate({scrollTop : 0}, 700);
    return false;
  });

  $('.play').click(function() {
    $('.play').toggleClass('active');
    // $("#bk-audio").stop(); //trigger("pause");
    let audio = $("#bk-audio")[0];
    audio[audio.paused ? 'play' : 'pause']();
    // document.getElementById('background_audio').pause();
    // .muted = true; .pause();    
    return false;
  });
  
});
