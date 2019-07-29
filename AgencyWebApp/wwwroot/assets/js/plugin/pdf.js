{

    version: 1.04,
    
    clone: function(originalContent){
            
        var newLocation = $('<div class="container pdfcontainer" />');
        var newContent = originalContent.clone(true,true);
        newContent.appendTo(newLocation);
        
        // Clone the canvas across
        var originalCanvas = originalContent.find("canvas");
        var cloneCanvas = newContent.find("canvas").css({margin:'0 auto'});
        cloneCanvas.parent().css('text-align','center');
        
        $.each(originalCanvas, function(index, value) {
        	var originalContext = originalCanvas[index].getContext("2d");
        	var imageData = originalContext.getImageData(0, 0, originalCanvas[index].width, originalCanvas[index].height);
        	var cloneContext = cloneCanvas[index].getContext("2d");
        	cloneContext.putImageData(imageData, 0, 0);
        });
        
        var transform = '';
        
        if(window.chrome) {// Fix for Chrome
            transform = newLocation.find(".gm-style>div:first>div").css("transform");
            
            if(transform){
            
                var comp=transform.split(","); //split up the transform matrix
                var mapleft=parseFloat(comp[4]); //get left value
                var maptop=parseFloat(comp[5]);  //get top value
                newLocation.find(".gm-style>div:first>div").css({ //get the map container. not sure if stable
                  "transform":"none",
                  "left":mapleft,
                  "top":maptop,
                });
            }
          }
          /*
          html2canvas([$("#map > div.g-map-canvas > div > div > div:nth-child(1)")[0]], {
            logging: false,
            useCORS: true,
            onrendered: function (canvas) {
              $('#screenshot').after(canvas);
        
              if(window.chrome) {// Fix for Chrome
                $(".gm-style>div:first>div").css({
                  left:0,
                  top:0,
                  "transform":transform
                });
              }
            }
          });
          */
        return newLocation.data('transform',transform);
    
    },
    
    init: function(c,a){
    
        //console.log('pdf init');
    
        var p = this, pdf = null;
    
        $('body').on('click','a.pdf',function(){

            var t = $(this), rel = t.data('rel') || 'body', init = t.data('init') || false;
            
            $('body').css('overflow','hidden');
            
            if(t.hasClass('disabled')) return false;
            
            t.addClass('disabled');
            
            var preloader = CMS.preloader({type:'simple',duration:0});
            preloader.append();

            pdf = new jsPDF('p', 'pt', 'a4', true);

            var element = t.closest(rel).find('.pdfpage'), container = p.clone(element), pages = [];

            //if(init) $('#inizio').clone().prependTo(container.find('.pdfpage:first'));
            
            //container.prepend('<div class="pdfpage" style="text-align:center;"><div style="padding:0 0 40px 0;margin:0px 50px 0 50px;border-bottom:1px solid #ddd"><img src="assets/img/logo-1.png"><p style="margin:30px 0;font-size:30px">REPORT</p></div></div>');
            
            //if(init) 
            //$('#mr-logo').clone().show().css('margin-top','50px').appendTo(container.find('.pdfpage:first'));
            
            
            
            element = container.find('.pdfpage'), l = element.length;
            
            var d = new Date(), dates = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' - ' + d.getHours() + ':' + d.getMinutes();
            
            container.find('#pdv-selectpicker').append('<div style="margin-top:20px;margin-bottom:50px">esportazione '+dates+'</div>');

            //return $('body').append(container);
            
            element.each(function(i,e){
            
                var page = $('<div class="container pdfcontainer" />').append( $(this) );//p.clone($(this));
                
                page.appendTo('body').data('index',i).find('.pdfignore').remove();
                
                page.find('#mr-logo').show();

                //CMS.circle(page,0);
                
                setTimeout(function(){
                
                html2canvas(page.get(0),{logging: false,useCORS: true}).then(function(canvas) {

                    page.remove();
                    
                    //console.log('w:'+pdf.internal.pageSize.width+', h:'+pdf.internal.pageSize.height);
                    //console.log('cw:'+canvas.width+', ch:'+canvas.height);
                    
                    if(window.chrome) {// Fix for Chrome
                        page.find(".gm-style>div:first>div").css({
                          left:0,
                          top:0,
                          "transform":page.find('[data-transform]').data('transform')
                        });
                    }
                    
                    var dataURL = canvas.toDataURL(), k = canvas.width/canvas.height, w = pdf.internal.pageSize.width, h = w/k;

                    pages[i] = {data:dataURL, w:w, h:h};
    
                    l--;
                    
                    if(l <= 0){ // end pages
                    
                        //console.log(pages);
                    
                        for(var p = 0; p < pages.length; p ++){
                        
                            //console.log('aggiungo img '+k);
                        
                            pdf.addImage(pages[p].data,'JPEG',0,0,pages[p].w,pages[p].h,"a"+p,"FAST");
                            
                            if(p < ( pages.length - 1) ) pdf.addPage();
                            
                        }
 
                        pdf.save('mondored.pdf');
                        
                        t.removeClass('disabled');
                        preloader.close();
                        $('body').css('overflow','auto');
                        
                        return false;
                    
                    }

                });
                
                },3000);
            
            });
        
        });
    
    }
    
}