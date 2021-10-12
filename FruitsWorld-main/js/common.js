let className;
let classNum;
let num;
let n;

let liLength = $("#eventList li").length;
let state = 1;
let timer = setInterval(nextSlider, 5000)
function nextSlider() {
  if ( state == 1) {
    state = 0;
    className = $("#eventList li:eq(0)").attr('class')
    classNum = className.substr(10, 1)
    console.log(classNum);
    if (classNum == liLength) classNum = 0;
    $("#numBtn a").removeClass('active')
    $("#numBtn a:eq("+ classNum +")").addClass('active')

    $("#eventList li:eq(1)").addClass('on')
                             .css({ opacity: 0 })
                             .animate({ opacity: 1 }, 1000, function() {
                               $("#eventList").append($("#eventList li:eq(0)"))
                               $("#eventList li:last").removeClass("on")
                               state = 1;
                             })
   }
}
function prevSlider() {
  if ( state == 1) {
    state = 0;
    className = $("#eventList li:last").attr('class')
    classNum = className.substr(10, 1);
    console.log(classNum);
    $("#numBtn a").removeClass('active')
    $("#numBtn a:eq("+ classNum +")").addClass('active')
    $("#eventList li:last").addClass('on')
                            .css({ opacity: 0 })
                            .animate({ opacity: 1 }, 1000, function() {
                              $("#eventList").prepend($(this))
                              $("#eventList li:eq(1)").removeClass('on')
                              state = 1;
                            })
  }
}
$(".next").on('click', function() {
  clearInterval(timer)
  timer = setInterval(prevSlider, 5000)
  nextSlider()
})
$(".prev").on('click', function() {
  clearInterval(timer)
  timer = setInterval(nextSlider, 5000)
  prevSlider()
})
// 번호버튼
$("#numBtn a").on('click', function() {
  if ( state == 1) {
    state = 0;
    if ( $(this).hasClass('active') ) {
      state = 1;
      return false;
    }
    else {
      $("#numBtn a").removeClass('active')
      $(this).addClass('active')
      num = $(this).index();
      n = num;
      $(".eventSlide" + num).addClass('on')
                        .css({ opacity: 0 })
                        .animate({ opacity: 1 }, 1000, function() {
                          for ( i=0; i<liLength-1; i++ ) {
                            n++;
                            if ( n == liLength+1 ) n = 1;
                            $("#eventList").append($(".eventSlide" + n))
                          }
                          $("#eventList li").not($(this)).removeClass('on')
                          state = 1;
                        })
      }
  }
})
