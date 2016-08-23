$(function(){
  $('.sidebar').on('mouseenter mouseout',function(){
    $(this).toggleClass('active');
    $('body').toggleClass('overflow');
  })

  $('.main').on('click','.thumbnail,.list-group-item',function(){
    $('.article').addClass('active');
    $('body').addClass('overflow');
    var id = $(this).attr('data-id');
    $('.article .inner').html(localStorage[id]).scrollTop(0);
    return false;
  })
  $('.article').on('click',function(){
    $(this).removeClass('active');
    $('body').removeClass('overflow');
  })
  $('.article .inner').on('click',false);


  var nengbunengqingqiu = true;
  var date = moment();

  $(window).on('scroll',function(){
    var top = $(window).scrollTop();
    if( top >= $('.main').height() - $(window).height() ){
      if(nengbunengqingqiu){
        nengbunengqingqiu = false;
        $.ajax({
          url:'http://zhihuapi.duapp.com/getnewsbydate',
          data:{date:date.format('YYYYMMDD')},
          dataType:'jsonp'
        }).done(function(data){
          date.subtract(1,'day');
          nengbunengqingqiu = true;
          $('<h3 class="cat-title"></h3>').text(date.format('YYYY-MM-DD')).appendTo('.main-inner');
          var el = $('<div class="row timeline"></div>').appendTo('.main-inner');
          renderList(data.stories,el);
        })
      }
    }
  });



  $.ajax({
    url:'http://zhihuapi.duapp.com/getnews',
    dataType:'jsonp',
  }).done(function(data){
    renderRedian( data.top_stories.slice(0,-2) );
    renderList(data.stories,'#today');
  })

  function renderList(arr,el){
    $.each(arr,function(i,v){
      $('<div class="col-xs-12" id="'+v.id+'"><a href="#" class="list-group-item" data-id="'+v.id+'"> <div class="img" style="background-image:url('+v.images[0]+')"></div> <div class="info"><h4 class="list-group-item-heading">'+v.title+'</h4> <p class="list-group-item-text"></p></div></a></div> ').appendTo($(el));
    })
    $.each(arr,function(i,v){
      if(!localStorage[v.id]){
        $.ajax({
          url:'http://zhihuapi.duapp.com/getnewsbyid',
          data:{id:v.id},
          dataType:'jsonp'
        }).done(function(data){
          localStorage[v.id] = data.body;
          $('#'+v.id).find('.list-group-item-text').text($(data.body).find('.content').text().slice(0,30));
        })
      }else{
        var text = $(localStorage[v.id]).find('.content').text().slice(0,30);
        $('#'+v.id).find('.list-group-item-text').text( text );
      }
    })
  }

  function renderRedian(arr){
    $('.main .redian').empty();
    $.each(arr, function(i,v){
      $('<div class="col-xs-4"> <div class="thumbnail" data-id="'+v.id+'"> <div class="img"><img src="'+v.image+'" alt=""></div> <div class="caption"> <h5>'+v.title+'</h5> <p><p> </div></div></div>').appendTo('.main .redian');
    })
  }
})
