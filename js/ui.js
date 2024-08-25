
// gnb 메뉴
function gnbMenu(){
  $('.menu-area .gnb .depth01 > li').on('mouseenter', function(){
    let $menu = $(this).find('.depth-warp');
    $(this).addClass('on');
    $menu.stop().fadeIn();
  });

  $('.menu-area .gnb .depth01 > li').on('mouseleave', function(){
    let $menu = $(this).find('.depth-warp');
    $(this).removeClass('on');
    $menu.stop().fadeOut();
  });
}


function quickMenu(){
  $('.quick-menu .btn-top').on('click', function(){
    $(window).scrollTop(0)
  });
  $(window).on('scroll', function(){
    let st = $(this).scrollTop();
    if(st > $(window).height() / 2){
      $('.quick-menu').addClass('on');
    }else{
      $('.quick-menu').removeClass('on');
    }
  });
}

function fullSlide(id, opt){
  if($(id + ' .swiper-slide').length <= opt.min) return;  
  if($(id).hasClass('main-slider') && $(id + ' .swiper-slide').length > 1 && $(id + ' .swiper-slide').length <= 4) {
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())
  }
  if($(id).hasClass('main-goods-list') && $(id + ' .swiper-slide').length > 5 && $(id + ' swiper-slide').length <= 15) {
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())

    setTimeout(function(){
      if($(id).hasClass('main-goods-list')) $(id + " .swiper-button-prev").click();
    }, 100);
  }

  if(opt && opt.autoplay) opt.autoplay.disableOnInteraction = false
  
  let option = {
    loop: true,
    // autoplay:{
    //   dealy: 300
    // },
    // initialSlide: 3,
    spaceBetween: 10,
    speed :800,
    slidesPerView: 'auto',
    centeredSlides: true,
    navigation: {
      nextEl: id + " .swiper-button-next",
      prevEl: id + " .swiper-button-prev",
    }, 
  }
    let swiper = new Swiper(id, Object.assign(option, opt));
    
}  

function basicSlide(id, opt){
  if($(id + ' .swiper-slide').length <= opt.min) return;  
  if($(id).hasClass('product-slide-list') && $(id + ' .swiper-slide').length > 4 && $(id + ' .swiper-slide').length <= 8) {
    $(id + ' .swiper-wrapper').append($(id + ' .swiper-wrapper').html())
  }

  if(opt && opt.autoplay) opt.autoplay.disableOnInteraction = false
  
  let option = {
      loop: true,
      speed :800,
      slidesPerView: 1,
      pagination: {
          el: id +" .swiper-pagination",
          clickable: true,
      },
      navigation: {
        nextEl: id + " .swiper-button-next",
        prevEl: id + " .swiper-button-prev",
      },       
    }

    if($(id +" .swiper-scrollbar").length > 0) {
      option.scrollbar = {
        el: id +" .swiper-scrollbar",
        draggable: true,
      }
    }

    let swiper = new Swiper(id, Object.assign(option, opt));
}  



function upani(){
  if($('[data-ani]').length <= 0) return; 
  let dir = true
  let scrollPos = 0
  $(window).scroll(function(){
    let scTop = $(window).scrollTop();  
    $('[data-ani]').each(function(){
          let top = $(this).get(0).getBoundingClientRect();
          dir = scrollPos - scTop > 0
  
          let pos =  $(window).height() - $(window).height() / 6;    
  
          if(top.top < pos) {
            $(this).each(function(){
              let $this = $(this);
              let delay =$this.data('delay')? $this.data('delay') : 0;              
              setTimeout(function(){
                $this.addClass('on');
              }, delay);
            });
          }
     })
     scrollPos = scTop;
  });
  
}


function getTime(id, time) {
  function f(){
    const target = new Date(time);
    const today = new Date();
    const gap = target - today;
    const d = Math.floor(gap / (1000 * 60 * 60 * 24)); // 일
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24); // 시
    const m = Math.floor(((gap / 1000) * 60) % 60); // 분
    const s = Math.floor((gap / 1000) % 60); // 초
    $(id).find('.days').html(d);
    $(id).find('.hours').html(h);
    $(id).find('.minutes').html(m);
    $(id).find('.seconds').html(s);
  }
  setInterval(f, 1000);
}


function popTooltip(){
	$("[data-evt=pop-tooltip]").on("click", function() {
    $tooltip = $(this).parents('.pop-tooltip-wrap').find('.pop-tooltip');
    $close = $tooltip.find('.close');
    
    $tooltip.addClass('on');
      
    $close.on('click', function(){
      $tooltip.addClass('off');
      setTimeout(function(){
        $tooltip.removeClass('off');
        $tooltip.removeClass('on');
      }, 200);
    });
  });
}

function allChk(){
	if(!$('[data-evt="all-chk"]').length>0) return;

	$('[data-evt="all-chk"]').each(function(){
		var name = $(this).attr('name');
		var _this = $(this);
		_this.on('change', function(){
			if($(this).prop("checked")){
				$('[name='+name+']').prop("checked", true);
			}else{
				$('[name='+name+']').prop("checked", false);
			}
		});
		$('[name='+name+']').on('change', function(){
			var total= $('[name='+name+']').not(_this).length;
			var chked= $('[name='+name+']:checked').not(_this).length;

			if(chked == total){
				 _this.prop("checked", true);
			}else{
				_this.prop("checked", false);
			}
		});
	});
}


function tabEvt(){
  let tabs = [];
  $('[data-tab-id]').on('click', function(){
    let tabid = $(this).data('tab-id');
    tabs = [];
    tabs.push(tabid);

    $(this).parents('li').addClass('on');
    $(this).parents('li').siblings().find('[data-tab-id]').each(function(){
      $(this).parents('li').removeClass('on');
      tabs.push($(this).data('tab-id'));
    });

    tabs.forEach(function(v){
      $('#'+v).hide();
    });
    $('#'+tabid).show();
  })
}

function tabScrollEvt(){
  if($('[data-scroll-id]').length <= 0) return;
  let click = false;
  $('[data-scroll-id]').on('click', function(e){
    e.preventDefault()
		click = true
		setTimeout(function(){
			click = false
		}, 500);

		let id = $(this).data('scroll-id');

		if($(this).parents('li').length > 0){
			$(this).parents('li').siblings().removeClass('on');
			$(this).parents('li').addClass('on');
		}else{
			$('[data-evt="tab-btns"] a').removeClass('on');
			$(this).addClass('on');
		}

		setTimeout(function(){
			if($('#'+id).length <= 0 ) return;
      $('html, body').animate({scrollTop:$('#'+id).offset().top}, 300);
		},100);
  });

}



function countInput(obj){  
  if($(obj).length <= 0) return;
  $(obj).each(function(){
    let $obj = $(this);
    let $up = $(this).find('.up');
    let $down = $(this).find('.down');
    let $input =  $obj.find('.num');    
    let minCnt = $obj.data('min') != undefined ? $obj.data('min') : 0;
    let maxCnt = $obj.data('max') != undefined ? $obj.data('max') : 1000;
    let cntInputNum =  $obj.find('.num').val();
    let inpval = parseInt($obj.find('input').val());

    let countChange = function(v){
      let val = parseInt(v);

      if(val >= maxCnt ){
        $up.attr('disabled', 'disabled');
        $down.removeAttr('disabled');
      }else if (val <= minCnt) {
        $down.attr('disabled', 'disabled');
        $up.removeAttr('disabled');
      }else{
        $down.removeAttr('disabled');
        $up.removeAttr('disabled');
      }

      if(val > maxCnt) val = maxCnt
      else if(val < minCnt) val = minCnt
      else if(!val) val = 0

      inpval = val;
      $($input).val(val);

      if(val == 1) $obj.addClass('one');
      else $obj.removeClass('one');
    }

    //초기화
    $obj.find('button').each(function(){
      if($(this).hasClass('down') && cntInputNum <= minCnt) $(this).attr('disabled', 'disabled');
      else if($(this).hasClass('up') && cntInputNum >= maxCnt)  $(this).attr('disabled', 'disabled');
    });
    $obj.find('button').off('click.count');
    $obj.find('button').on('click.count', function(e){
      e.stopPropagation();      
      inpval = parseInt($obj.find('input').val());
       if($(this).hasClass('up')) countChange(inpval + 1);
       if($(this).hasClass('down')) countChange(inpval - 1);
    });


    $obj.find('input').on('change', function(){
      countChange($(this).val())
    });
  });
}


function maxLengthChk(object){
  $(object).on('input', function(){
    if (this.value.length > this.maxLength){
      this.value = this.value.slice(0, this.maxLength);
    }
  })
}

function fileAdd(wrap){
  if($(wrap).length <= 0) return;
  let $wrap = $(wrap);
  
  create();
  function create(){
    let html = `<div class="inp-file">
      <div class="trigger">
        <div class="input">
            <input type="text" class="path">
          </div>
        <input type="file" class="real">
        <button type="button" class="btn-type5 st3">찾아보기</button>
      </div>
      <button type="button" class="btn-type5 st2 btn-add">+ 추가</button>
      <button type="button" class="btn-type5 st2 btn-del">삭제</button>
    </div> `;

      let $fileset = $(html);
      $wrap.append($fileset);
      numbering();

      $fileset.find('input[type=file]').on('change', function(){
        console.log('df');
        let v = $(this).val();
        console.log(v);
        $fileset.find('input[type=text]').val(v.split('fakepath\\')[1]);
      });
      //add
      $fileset.find('.btn-add').on('click', function(){
        fileAdd(wrap);
      });
      //del
      $fileset.find('.btn-del').on('click', function(){
        $fileset.remove();
      });
  }

  function numbering(){
    $wrap.find('input[type=file]').each(function(i){
      $(this).attr('name', 'file'+i);
    })
  }  
  
}


function dateSet(){
  $(".date-menu").children("label").each(function () {
      var radioInput = $(this);
      radioInput.on("click", function (e) {
          radioInput.children("input:radio").prop("checked", true);

          $(this).parents('.date-setting-box').find('.start-date').val(extractDate(radioInput.find("input:radio").val()));
          $(this).parents('.date-setting-box').find('.end-date').val(extractDate("today"));

          e.preventDefault();
      });
  })

  if($('[ data-init=checked]').length > 0 ) $('[ data-init=checked]').click();

  function extractDate(val) {
      var nowDate = new Date();
      switch (val) {
          case "oneWeek":
              nowDate.setDate(nowDate.getDate() - 7);
              break;
          case "fifteenDay":
              nowDate.setDate(nowDate.getDate() - 15);
              break;
          case "oneMonth":
              nowDate.setMonth(nowDate.getMonth() - 1);
              break;
          case "threeMonth":
              nowDate.setMonth(nowDate.getMonth() - 3);
              break;
          case "sixMonth":
              nowDate.setMonth(nowDate.getMonth() - 6);
              break;
          case "tenMonth":
              nowDate.setMonth(nowDate.getMonth() - 10);
              break;
          case "oneYear":
              nowDate.setFullYear(nowDate.getFullYear() - 1);
              break;
      }

      var year = nowDate.getFullYear();
      var month = ("0" + (1 + nowDate.getMonth())).slice(-2);
      var day = ("0" + nowDate.getDate()).slice(-2);

      return year + "-" + month + "-" + day;
  }    

  $(this).parents('.date-setting-box').find(".datepicker").on('change', function(){
    console.log('change');
    $(this).parents('.date-setting-box').find("input:radio").val(null);
  });
}

function datepicker(){
  if($(".datepicker").length <= 0) return;
   $(".datepicker").datepicker({
     dateFormat:'yy-dd-mm',
   });
   $.datepicker.setDefaults({
     dateFormat: 'yymmdd',
     prevText: '이전 달',
     nextText: '다음 달',
     monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
     dayNames: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
     dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
     showMonthAfterYear: true,
     yearSuffix: '년',
     onSelect: function (input, inst) {
      if($(this).parents('.date-setting-box').length > 0) $(this).parents('.date-setting-box').find("input:radio").prop("checked", false);
     }
   });
}

function clip(val){
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = val;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("URL을 클립보드에 복사했습니다")
};


function toggleBtns(){
  $('[data-evt="toggle-btns"] button').on('click', function(){
    $(this).parents('li').siblings().removeClass('on');
    $(this).parents('li').addClass('on');
  });
}

	
function comma(){
  $('[data-evt=price]').on('keyup', function(e){
    var val = this.value.replace(/[^0-9]/g, "");
    this.value = val.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
  })
}


/* popup */
function popClose(id){
	$(id).fadeOut(300);
	$('body').css('overflow','');
} 

function popOpen(id, callback){
	$(id).fadeIn(300);
	$('body').css('overflow','hidden');
	if(callback !=undefined ) callback();

	$(id).find('.close').on('click', function(){
		popClose(id);
	})
}


//loading
function loading(){
  const loadingHtml = `<div class="loading-bar">
		<div class="three-bounce">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>`

  const $loading = $(loadingHtml);  
  $('.wrap').append($loading);  
  $('body, html').css('overflow', 'hidden');
}
function loadingClose(){
  $('.loading-bar').remove();  
  $('body, html').css('overflow', '');
}

$(function(){
  gnbMenu();
  quickMenu();
  dateSet();
  fileAdd('.inp-file-wrap');
  popTooltip();
  allChk();
  tabEvt();
  tabScrollEvt();
  comma();
  countInput('[data-evt*="inp-number"]');
  maxLengthChk('[type=number][maxlength]');
  toggleBtns();
  datepicker();
  upani();
});