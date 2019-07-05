/******************************************************************************
 * CMS admin v 2.0 ********************************************************                                 
 ******************************************************************************/
         
(function(scope){

    scope.BASEPATH = '/maps/';
    
    scope.PATH = scope.BASEPATH;
    
    scope.lang = { // default language assets
        er_404: 'Impossibile caricare la pagina',
        er_fields:'Completa i campi richiesti. ',   
        er_generic:'Richiesta fallita.',
        er_plugin:'Impossibile caricare il plugin',
        er_json:'Errore JSON. Si prega di contattare il gestore del servizio',
        ok_request:'Fatto',
        alert_label_void:'Il campo va riempito',     
        alert_label_integer:'solo numeri interi',
        alert_label_phone:'solo numeri interi e simbolo +',
        alert_label_float:'solo numeri e punto(.)',
        alert_label_email:'inserire un indirizzo valido',
        alert_label_prov:'due caratteri alfabetici',
        alert_label_cap:'5 caratteri alfabetici',
        
        txt_loading:'Caricamento...',
        
        date_format: 'dd/mm/yyyy',
        time_format: 'hh:ii:ss'  
    };
    
    scope.getToday = function(){
        var date = new Date();
        return Math.floor(date.getTime()/1000);
    };
    
    scope.getLabel = function(k){
        if(scope.lang[k]) return scope.lang[k];
        else return k; 
    };
    
    scope.getPath = function(){
        return window.location.toString().split('?')[0].split('#')[0];
    };
    
    // verifica la presenza di errori nel form
    scope.check = function(form, submitter, callback){
    
        var _check = function(error){
        
            console.log('call check');
        
            var errors = 0;
            
            form.find('.dropzone').each(function(){
                var t = $(this), parent = t.closest('.box-file'), required = t.data('required');
                if( (required && !parent.hasClass('complete') ) || t.hasClass('error')){
                    if(error) t.addClass('error');
                    errors ++;
                }
            });
            
            form.find('.form-group').each(function(){
                var t = $(this), input = t.find('input, textarea'), has_error = false;
                if(t.hasClass('has-error') || has_error){
                    errors ++;
                }
            });
            
            if(errors > 0) submitter.addClass('disabled');
            else submitter.removeClass('disabled');
            
            console.log('errors: '+errors);
            
            return errors;
        
        };
        
        form.on('submit',function(e){
        
            if (e.isDefaultPrevented()) {
                // Form non valido...Controllo comunque se le immagini con data-required="true" sono inserite per segnalare l'errore
                $(".dropzone").each(function () {
                    var t = $(this), el = t.parent();
                    if (t.data('required') == true) {
                        if ((t.hasClass('error')) || (!el.hasClass("complete"))) {
                            t.addClass('error');
                        }
                    }
                });
            } else {
                // Form valido ma controllo se le immagini con data-required="true" sono inserite per segnalare l'errore e bloccare l'invio del form
                $(".dropzone").each(function () {
                    var t = $(this), el = t.parent();
                    if (t.data('required') == true) {
                        if ((t.hasClass('error')) || (!el.hasClass("complete"))) {
                            t.addClass('error');
                            e.preventDefault();
                            $("body").trigger("click");
                        }
                    }
                });
            }
            
            if(callback) callback( e, _check() );
        
        }).on('change keyup','input, .dropzone, textarea',function(evt){
        
            setTimeout(function(){
                _check(true);
            },100);
 
        });
        
        setTimeout(function(){
            _check();
        },100);
    
    };

    var circle_id = 0;
    scope.circle = function (obj) {
        var c = {};
        obj.find('[data-circle]').each(function (i, e) {
            var t = $(e).empty(), color = t.data('color') || '#ea9d2b', color2 = t.data('color2') || '#284a53', radius = t.data('radius') || 50, duration = t.data('duration') || 400, value = t.data('value') || 0, width = t.data('width') || 3;
            t.attr('id', 'stat_' + circle_id);
            console.log(t.data());
            c['stat_' + circle_id] = Circles.create({
                id: 'stat_' + circle_id,
                radius: radius,
                value: value,
                maxValue: 100,
                width: width,
                text: function (value) {
                    return value + '<span>%</span>';
                },
                colors: [color2, color],
                duration: duration,
                wrpClass: 'circles-wrp',
                textClass: 'circles-text',
                valueStrokeClass: 'circles-valueStroke',
                maxValueStrokeClass: 'circles-maxValueStroke',
                styleWrapper: true,
                styleText: false
            });
            
            console.log('circle '+circle_id);

            circle_id++;

        });

        return c;

    };
    
    scope.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    scope.preloader = function(opt,callback){
        var preloader = {

          content: $('<div class="npreloader init shadowed"></div>'),

          blend: function(id){
            return this; 
          },
          
          init: function(){
            return this;
          },
    
          append: function(){
            this.content.prependTo('body');
            if(scope.preload_tot) $('body').trigger('preloader',[scope.preload_tot]);
            preload_tot = 0;
            return this;
          },

          remove: function(){
            console.log('preloader close');
            var t = this;
            t.content.animate({opacity:0,duration:300},function(){
              t.content.empty().remove();
            }).removeClass('init').addClass('end');
          },
          
          close: function(){
            this.remove();  
          },
          
          complete: function(){
            this.remove();
          },
          
          strings:[],
          index: 0, // numero di chiamate a status
          current: 0, // riga corrente
          total:0, // numero totali di chiamate previste
          time:0, // media tempo di chiamata (Sec.)
          start:0, // timestamp prima chiamata
          duration: (0.134 + 0.035), // tempo medio per pdv
          si: null // set interval
        };
         
        preloader.content = $('<div class="npreloader init"><div class="animation"><div class="c1"><div class="c2"></div></div></div><div class="text hide"></div></div>');

        if(opt && opt.complex){
        
            if(opt.strings){
            
                /*var text = '<ul data-tot="' + opt.strings.length + '">';
                for(var i = 0; i < opt.strings.length; i++) text += '<li data-index="'+i+'">' + opt.strings[i].toString() + '</li>';
                text += '</ul>';*/
                //preloader.strings = opt.strings;
                
                preloader.content.find('.text').removeClass('hide').html('Calcolo in corso...');
                
            }
            
            console.log({'prel opt':opt});

            $('body').on('preloader',function(evt, tot){
            
                scope.preload_tot = tot;
            
                console.log({'evt':evt, 'tot':tot});
            
                if(preloader.si){
                
                    clearInterval(preloader.si);
                    preloader.si = null;
                    
                };

                var duration = (preloader.duration * tot * 1000 + 1000), d = new Date(), from = d.getTime(), to = from + duration, perc = 0, diff = (to - from), now = 0;

                preloader.si = setInterval(function(){
                
                    d = new Date();
                    
                    now = d.getTime();

                    perc = Math.ceil( (100 * (now-from)) / diff );

                    //console.log({'from':from, 'now':now, 'to':to,'diff':diff});
                    
                    if(now > to){
                    
                        //console.log('preloader terminato...');
                    
                        clearInterval(preloader.si);
                        
                        setTimeout(function(){
                            preloader.content.find('.text').text('Completamento in corso...');
                        },200);
                        
                        perc = 100;
                        
                    }

                    preloader.content.find('.text').text(perc+'%');
                    //preloader.status(tot,item);
                },50);
                
            });
        }
        
        return preloader.append();
    
    };

    /**
    * @function loadData
    * @param params:Object
    * load custom content      
    */     
    scope.loadData = function(params){
        if(!params.type) params.type = 'GET';
        if(!params.dataType) params.dataType = 'html';
        if(!params.mimeType) params.mimeType = "text/html; charset=UTF-8";
        $.ajax({
    		type: params.type,
    		dataType: params.dataType,
            //scriptCharset: "iso-8859-2" ,
            scriptCharset: 'UTF-8',
            contentType: params.mimeType,
    		url: params.url,
    		success: params.callback,
            error: params.error
        });
    };

  
    /**
    *  @function openUrl
    *  @param url:String
    *  @return String        
    *  open link, prevent cache
    */     
    var openURL = function(url){
        return url+'?v='+new Date().getTime();
    };

    
    var PLUGIN = {}; // loaded plugin
    
    var HISTORY = {back:[],current:'',load:false}; // navigation history for back buttons

    var ALERT = {wait:false,items:[]}; // queue alert

    var obj = {}; // utility 

    scope.strToObj = function(str){  
        try{
            var obj = {};      
            eval('obj.args = ' + str + ';');      
            return obj.args;    
        }catch(e){    
            CMS.debug('unable to convert string '+str);    
            return false;      
        }
    };
    

    /**
    * @function init
    * @param data:Boolean  
    */   
	scope.init = function(data) {

        var body = $('body');

        /* Menu Toggle Script */
        /* Open Menu */
        //$("#open-menu").click(function () {
        body.on('click','#open-menu',function(){
            if ($("#menu-left").hasClass("open")) {
                $("#menu-left").removeClass("open");
                $("#open-menu").parent().removeClass("open");
                $("#content-top").addClass("merge-left");
            } else {
                $("#menu-left").addClass("open");
                $("#open-menu").parent().addClass("open");
                //$("#content-top").removeClass("merge-left");
                if ($("#sidebar-dashboard").hasClass("open")) {
                    $("#sidebar-dashboard").removeClass("open");
                    $("#open-sidebar").parent().removeClass("open");
                    //$("#content-top").addClass("merge-right");
                    var addPdv = $("#add-pdv");
                    if (addPdv.length != 0) {
                        if (addPdv.hasClass("open")) {
                            addPdv.removeClass("open");
                        }
                    }
                }
            }
        }).on('click','#open-sidebar',function () { // sidebars
            var addPdv = $("#add-pdv");
            if ($("#sidebar-dashboard").hasClass("open")) {
                $("#sidebar-dashboard").removeClass("open");
                $("#open-sidebar").parent().removeClass("open");
                //$("#content-top").addClass("merge-right");
                if (addPdv.length != 0 && addPdv.hasClass("open")) addPdv.removeClass("open");

            } else {
                $("#sidebar-dashboard").addClass("open");
                $("#open-sidebar").parent().addClass("open");
                $("#content-top").removeClass("merge-right");
                if ($("#menu-left").hasClass("open")) {
                    $("#menu-left").removeClass("open");
                    $("#open-menu").parent().removeClass("open");
                    //$("#content-top").addClass("merge-left");
                }
                if (addPdv.length != 0) addPdv.addClass("open");
            }
        }).on('click', '.flipper', function () {
            var t = $(this), parent = t.parent().parent();//closest('div');

            var elements = parent.find('.flipper');
            if(elements.lenght <= 1) {
                return false;
            }
            if (t.hasClass('selected')) return false;
            if (t.hasClass('flip')) t.removeClass('flip').removeClass('selected');
            else {
                t.addClass('flip').addClass('selected');
                //console.log(parent);
                parent.find('.flipper').not(t).removeClass('flip').removeClass('selected');
            }
        }).on('keydown keyup change','input',function(){ // sostituisco ogni slash and backslash
            
            var t = $(this), val = t.val().replace(/\//g, '-').replace(/\\/g, '-');
            
            t.val(val);
        
        });
        
        scope.circle(body);

	};

  
  /**
   *  @function loadContentload content
   *  @param url:String
   *  @param type:String - dialog or page   
   *  @param callback:Function
   *  @param params:Object [args to pass]
   *  
   *  load html content and show it in dialog or page              
   */   
  scope.loadContent = function(url,type,callback,params,container,container_html,back,is_sub,hide_message){
    
    if(scope.block === true) return false;
  
    if(typeof callback !== 'function') callback = function(a,b,c){};
  
    if(HISTORY.load == true && type == 'page'){
      scope.openAlert({html:scope.getLabel('alert_loading'),classes:'info',asap:true});
      return callback(false);
    }

    if(!container) container = '#loaded';
    
    HISTORY.load = true;

    scope.loadData({
    
      callback: function(result){
      
        HISTORY.load = false;
      
        try{
          result = $(result);
        }catch(e){
          scope.openAlert({html:scope.getLabel('er_parsing_html')});
          return callback(false);
        }
      
        var content = result.find(container).first();
        
        var switchType = function(plugin){

          plugin.content = content;
          
          if(type == 'dialog') _openDialog(content,plugin,params);
          else _openPage({url:url,content:content,plugin:plugin,rel:content.data('rel'),id:scope.getId(),args:params,container:container_html,is_sub:is_sub},back);

          callback(content);
          
          return;
        
        };
        
        if(content.length > 0){ // il content exists

          if(content.data('plugin')){ // plugin exists
            
            if(!params) params = {};
          
            params.get_ctrl = content.data('plugin_get_ctrl') || false;
            params.get_action = content.data('plugin_get_action') || false;

            scope.loadPlugin(content.data('plugin'),function(plugin){ // load plugin
 
              switchType(plugin);

            });
          
            return;
          
          }
          
          switchType(false); 
          return;
          
        }else{
        
          scope.openAlert({html:scope.getLabel('er_404')+' no ' + container});
          
        }
        
        callback(false);
      
      },
      
      error: function(){
        if(!hide_message) scope.openAlert({html:scope.getLabel('er_404')});
        HISTORY.load = false;
        callback(false, scope.getLabel('er_404'));
      },
      
      url: scope.PATH + 'cpanel/page/' + openURL(url)
      
    });  
    
  };

    /**
    * @function loadPlugin
    * @param name:String
    * @param callback:Function
    * load a plugin by name, store it in PLUGIN Object and return it         
    */ 
    var plgns = 0;
    scope.triggerPlugin = function(evt,data,param){
        $.each(PLUGIN,function(i,e){
            if(e.active == 1) e.onEvent(evt,data,param);
        });
    };
  
  scope.loadPlugin = function(name,callback,isNew){

    var obj = this;

    scope.loadData({
      type: 'get',
      dataType : 'text',
      error: function(res){  
        callback(false);              
      },
      callback: function(res){
      
        var js = '(function() { obj.plugin = ' + res + ' })();';

        try{
          eval(js);
        }catch(e){
          callback(false);
          scope.openAlert({html:'plugin <b>'+name+'</b> error parsing'});
          return;
        }
        
        // Modificato perché la cache crea problemi andando avanti/indietro tra le pagine
        if (PLUGIN[name] && false) {

          if(isNaN(obj.plugin.version) || obj.plugin.version <= PLUGIN[name].version){
            if(!isNew) callback(PLUGIN[name]);
            else callback($.extend({},PLUGIN[name]));
            return;
          }
          
        }
        
        plgns ++;
        
        PLUGIN[name] = obj.plugin;
        
        if(!(PLUGIN[name].name)) PLUGIN[name].name = 'P'+plgns;
        
        if(!(PLUGIN[name].version)) PLUGIN[name].version = 0;
        
        if(!(PLUGIN[name].active)) PLUGIN[name].active = 0;
        
        if(!(PLUGIN[name].init)) PLUGIN[name].init = function(c,a){CMS.debug('init '+this.name);};
        
        if(!(PLUGIN[name].destroy)) PLUGIN[name].destroy = function(c){this.active = 0;};
        
        if(!(PLUGIN[name].onEvent)) PLUGIN[name].onEvent = function(evt,data,params){CMS.debug('evt: '+evt+' on plugin '+this.name);};

        if(!isNew) callback(PLUGIN[name]);
        else callback($.extend({},PLUGIN[name]));
        
      },
      url: openURL(scope.BASEPATH + name + '.js')
    });
    
  };    


    scope.formatPrice = function(n, dec, sep1, sep2, suffix) {
        _n = (n + '').replace(/[^0-9+-Ee.]/g,'');
        if(isNaN(_n)) _n = 0;
        n = Math.abs(_n).toString();
        dec = (typeof sep2 == 'undefined') ? 2 : dec;        
        sep2 = (!sep2) ? ',' : sep2; // ,
        sep1 = (!sep1) ? '.' : sep1;
        suffix = (typeof suffix == 'undefined') ? ' \u20AC' : suffix;
        
        var prefix = '';
        if(_n < 0) prefix = '-';
        
        var dollars = n.split('.')[0], 
        cents = (n.split('.')[1] || '') +'0000000';
        dollars = dollars.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1'+sep1).split('').reverse().join('');
        return prefix + dollars + sep2 + cents.slice(0, dec) + suffix;
    };

    scope.floatFixed = function(num, dec, sep){
        if(!dec) sep = '';
        if(!sep) sep = '';
        return scope.formatPrice(num,dec,'.',sep,'');
    };
    
    scope.truncate = function(string,length){
        if(!length) length = 100;
        if(!string) string = '';
        if(string.length>length) string = string.substring(string,length)+' [...]';  
        return string;
    };

    scope.filename = function(path){
        var name = path.split('/');
        var l = name.length;
        if(l>0) return name[l-1];
        return path;
    };

    
    scope.addPlugin = function(name, obj){            
        if(!PLUGIN[name]) PLUGIN[name] = obj;        
    };
    
    scope.getPlugin = function(name){
        if(PLUGIN[name]) return PLUGIN[name];
        return false;
    };
    
    scope.perc = function(a,tot,s){
        if(!s) s = '%';
        return scope.formatPrice( ( parseFloat(a) / parseFloat(tot) ) * 100, 1, '.', '.', s );
    };


    scope.sendAction = function(url,param,btn,callback,unres,alertdialog){

        if(btn){
        
            if(!btn.hasClass('loading')) btn.addClass('loading');//.attr('disabled','disabled');
            
            else return;
          
        }

        var call = $.ajax({
            attempt: 1,
            type: 'POST',
            data: param,
            datatype: 'json',
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            mimeType: 'text/json',
            url: url,
            cache: false,
            success: function(json){
      
                if(btn) btn.removeClass('loading');
        
                if(!json){
                    if(!unres) scope.openAlert({html:scope.getLabel('er_json')});
                    return;
                }else{

                    if(json.action == 'logout' || json.action == 'login'){
                    
                        if(json.data){
            
                            var loc = scope.getPath();

                            leave = true; // remove prevent change page
                            
                            window.location = loc;
                            
                            return;
                        }
                        
                    }

                }
        
                callback(json, param);
                
                CMS.triggerPlugin(param.controller+':'+param.action,json,param);
                
                //showError(json,alertdialog);

            },
			error: function(XMLHttpRequest, textStatus){
   
                if(btn) btn.removeClass('loading');
                
                callback(false);
                
                if(textStatus !== 'abort'){
                
                    if(!unres) scope.openAlert({html:scope.getLabel('er_generic')});
                    
                    CMS.triggerPlugin(param.controller+':'+param.action,false,param);
                    
                }
                
            }
            
        });

        return call;

    };

  /**
   *  function openAlert
   *  @param params:Object
   *  show a system alert message         
   */     
  scope.openAlert = function(params){      
  
    var alert = false;
    
    if(params !== false){
      if(!params.html) params.html = '';
      if(!params.time || isNaN(params.time)) params.time = 5000;
      else params.time *= 1000;
      if(!params.type) params.type = 'error';
      if(params.dialog){
        params.html = $('<div class="p10" />').append(params.html);
        if(!params.title) params.title = CMS.getLabel('alert');
        params.classes = 'small';
        params.closeByBack = true;
        return scope.openDialog(params);
      }
      
      if(params.type == 'error') params.time += 3000;

      alert = {time:params.time,item:$('<div class="alert '+params.type+'" />').hide().append(params.html).append('<a class="close"></a>'),close:function(){
        alert.item.off('click','a.close').animate({bottom:0,opacity:0},300,function(){
          alert.item.empty().remove();
        });
      }};
      
      alert.item.on('click','a.close',function(e){alert.close();});
      
      if(!params.asap){
        ALERT.items.push(alert);        
        scope.openAlert(false);
      }else{
        alert.item.appendTo('body').fadeIn(500);
        setTimeout(alert.close,params.time);
      }

      return alert;
      
    }
    
    if(ALERT.items.length > 0 && ALERT.wait == false){
      alert = ALERT.items[0];
      ALERT.wait = true;
      alert.item.appendTo('body').fadeIn(500);
      setTimeout(function(){
        alert.close();
        ALERT.wait = false;
        scope.openAlert(false);
      },alert.time);
                                                     
      ALERT.items.splice(0,1);
    }
    
  };
  
    scope.goTop = function(){
        $('html, body').animate({scrollTop : 0},300);   
    };
    
    scope.goBottom = function(el){
        el.animate({scrollTop : el.get(0).scrollHeight },300); 
    };
  
    scope.showAlert = function(title,message,buttons,type,size){
    
        return BootstrapDialog.show({
            title:title,
            message:message,
            type:type,
            size:size,
            buttons:buttons    
        });
        
    };

    scope.setFocus = function(html){
        html.find('input[type="text"], textarea').each(function(i,e){
            var e = $(e), value = e.val(), required = scope.strToObj( e.data('required') );
            e.on('focus',function(){
                var t = $(this);
                if(t.val() == value){
                    if(t.data('valid')=='password') t.prop('type','password');
                    t.val('');
                }
            }).on('blur',function(){
                var t = $(this);
                if(t.val() == ''){
                    if(t.data('valid')=='password') t.prop('type','text');
                    t.val(value);
                }
            });
            
            if(required){
 
                $.each(required, function(ii,ee){ // array

                    $.each(ee,function(iii,eee){
                    
                        var target = e.closest('form').find('[name='+iii+']');
                        if(typeof eee === 'string') eee = [eee];
                        target.on('change',function(evt){
                            var v = $.trim( $(this).val() );
                            if($.inArray(v.toLowerCase(),eee) >= 0) e.addClass('required');
                            else e.removeClass('required');
                        }).on('cms:updated',function(){
                            $(this).trigger('change').off('cms:updated');
                        });
                    
                    });
                    
                });
            
            }
        });
    
    };

    scope.setForm = function(form,param,callback,callbackSubmit){     
  
        var cls  = 'error', file = false, l = form.find('.multilang'), c = form.find('.calendar.auto'), url = form.attr('action');
        
        c.each(function(i,e){
        
          e = $(e);
          
          var name = e.attr('name'), cl = e.clone().attr('type','hidden').attr('class','').prependTo(form).on('change',function(){
            var t = $(this).off('change');
            e.val(CMS.dateFormat(t.val()));
          });
          
          e.attr('name','_'+name).attr('maxlength',11);
          
          if(e.val() != '') e.val( CMS.dateFormat( e.val() ) );
          
          CMS.dateToTimestamp(e,cl);
        
        });
    
        scope.setFocus(form);
        
        form.on('change','input:file',function(){
          var _this = $(this);
              _this.parent().find('img').remove();
              
          var validation = _this.attr('valid');
          
          if(validation && validation!='false') validation = validation.split(',');
          else validation = false;
              
          if(this.files){
          
            file = this.files;
            
            $.each(this.files,function(i,e){
              var name = e.name.toLowerCase();
              var ext  = name.substr((name.lastIndexOf('.') +1));
              var size = parseFloat(file.size)/1024;
    
              if(validation){
                if($.inArray(ext, validation)<0){
                  file = false;
                  scope.openAlert({html:CMS.getLabel('er_file_ext') + ': ' + name});
                  scope.openAlert({html:'le estensioni supportate sono: ' + _this.attr('valid'),classes:'info'}); 
                  return;             
                }  
              }
              
              var src = 'img/upload_single.png';
              if(file.length>1) src = 'img/upload_multi.png';
              $('<img />').css({'position':'absolute','z-index':'1','top':'0','left':'0'}).attr('src', src).appendTo(_this.parent());
              
            });
    
          }else{
          
             scope.openAlert({html:scope.getLabel('er_file_upload'),time:5});
             
          }
          
        });
    
        form.on('submit',function(evt){
        
            var button = form.find('button');
            
            if(button.hasClass('loading')){
                scope.openAlert({html:'Operazione in corso...',asap:true,classes:'info'});
                return false;
            }
            
            var errors = '';
            var data   = {};
              
            var validate={valid:false,value:''};
          
            form.find('input,textarea,select').each(function(i,e){
    
                if($(e).is(':visible') || $(e).is('input[type=hidden]') || $(e).hasClass('auto-hide') || $(e).hasClass('chosen') || $(e).hasClass('tags') || $(e).hasClass('editor')){
                
                    if($(e).is('[type=radio]')) if(!$(e).is(':checked')) return true
                    
                    validate = validateField($(e));
                    
                    var item = $(e).attr('name');
                    
                    if(!validate.valid.valid){
                        var sms = '';
                        if(validate.valid.sms) sms = '<span class="f10"> ('+validate.valid.sms+')</span>';
                        errors+='<p><b>'+$(e).attr('name').replace(/_/g,' ').capitalize()+'</b>'+sms+'</p>';
                        $(e).addClass(cls);
                    }else{
                        $(e).removeClass(cls);
                        data[item]=validate.value;
                    }
                  
                }
            
            });
    
            if(errors == ''){
                
                button.addClass('loading');
                
                if(callbackSubmit) callbackSubmit();
                
                if(param) for(var p in param) if(!data[p]) data[p]=param[p];
                
                if(!file){ // se non sono presenti file invio una richiesta normale
    
                    if(param){
                        $.each(param,function(i,e){
                            if(!data[i]) data[i] = e;
                        });
                    }
                  
                    scope.sendAction(url,data,null,function(result){
                    
                        button.removeAttr('disabled').removeClass('loading');
                        
                        if(callback) callback(result,data);

                    });
    
                }else{ // altrimenti invio una richiesta iframe   
              
                    var name   ='frame-'+CMS.getToday();
                    
                    var iframe = $('<iframe name="'+name+'" id="'+name+'" style="display:none"></iframe>').appendTo('body');
                    
                    var news   = $('<div class="news" />');
                    
                    form.prepend(news)
                    .attr("action", form.attr('action') )
                    .attr("method", "post")
                    .attr("enctype", "multipart/form-data")
                    .attr("encoding", "multipart/form-data")
                    .attr("target", name);
    
                    // new params
                    if(param){
                        $.each(param,function(i,e){
                            if($.isArray(e)){
                                $.each(e,function(ii,ee){
                                    news.append('<input type="hidden" name="'+i+'[]" value="'+ee+'">'); 
                                });  
                            }else{
                                if(form.find('[name='+i+']').length==0) news.append('<input type="hidden" name="'+i+'" value="'+e+'">'); 
                            }
                        });
                    }
              
                    iframe.load(function(){
                    
                        button.removeAttr('disabled').removeClass('loading');
                        
                        news.empty().remove();
                        
                        var result = false;
                        
                        try{
                        
                            result = $.parseJSON( iframe.contents().find('body').text() );
                        
                        }catch(e){
                        
                            result = scope.strToObj( iframe.contents().find('body').text() );
                          
                        }
                        
                        //showError(result);
                        
                        if(callback) callback(result, data);
                           
                        iframe.empty().remove();
                        
                        if(result && result.data && !param.preserve_form_file){
                            form.find(':file').parent().find('img').remove();
                            form.find('input[type=file]').val('');
                            file = false;
                        }
                    
                    });
              
                    return true;
            
                }
            
            }else{
                scope.openAlert({html:scope.getLabel('er_fields')+errors,time:3,asap:true});   
            }
          
            return false;
      
        });
                
	};

    var validateField = function(field){
        var result={valid:{valid:true},value:field.val()}
        if(field.hasClass('required')){
            if(field.is('input[type="text"]') || field.is('input[type="hidden"]') || field.is('input[type="password"]') || field.is('textarea')){
                result.value=field.val();
                if(field.hasClass('editor')) result.value = field.closest('.jqte').find('.jqte_editor').html();
                if(field.val()!='' && field.val()!=field.prop('defaultval') || (field.val()==field.prop('defaultval') && field.hasClass('default'))){
                if(field.data('valid')){
                    result.valid = regexUtils(field.val(),field.data('valid'),field);
                    result.type = field.data('valid');
                }
                }else{
                    result.valid={valid:false,sms:scope.getLabel('alert_label_void')};
                    result.type='default';
                }
            }else if(field.is('input[type=checkbox]')){
                result.value=result.valid.valid=field.is(':checked');
            }else if(field.is('select')){
                if(result.value == '' || result.value == field.data('error') || field.find('option').length == 0) result.valid = {valid:false,sms:scope.getLabel('alert_select_void')};
            }else if(field.is('input[type=radio]')){
                result.value=field.parent().find('input[name='+field.attr('name')+']:checked').val();
            }else if(field.is('input[type=file]')){
                if(field.get(0).files.length == 0) result.valid.valid=false;
            }
        }else{
            if(field.is('input[type=text]') || field.is('textarea') || field.is('select')){
                if(field.data('valid') && field.val()!=''){ // per validare i campi non validi ma riempiti male
                    result.valid = regexUtils(field.val(),field.data('valid'), field);
                    result.type = field.data('valid');
                }
            }else if(field.is('input[type=checkbox]')){
                result.value=field.is(':checked');
            }else if(field.is('input[type=radio]')){
                result.value = field.parent().find('input[name='+field.attr('name')+']:checked').val();
            } 
        }
        
        return result;
    };
  
    scope.validate = function(str, type){
        return regexUtils(str,type);
    };
    
    scope.debug = function(obj){
        if(console) console.log(obj);
    };

    var regexUtils = function(str, type, el){
        var re;
        var sms = false;
        switch(type){
        	case 'email':
        		re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        		sms= scope.getLabel('alert_label_email');
                break;
            case 'price':
            case 'float':
                re = /^-?\d*(\.\d+)?$/;
                sms= scope.getLabel('alert_label_float');
                break;
            case 'integer':
                re = /^\d+$/;
                sms= scope.getLabel('alert_label_integer');
                break;
            case 'phone':
                re = /^[+]?\d+$/;
                sms= scope.getLabel('alert_label_phone');
                break;
            case 'cap':
            case 'zip':
                re = /^[0-9]{5}$/;
                sms= scope.getLabel('alert_label_cap');
                break;        
            case 'date':
                var l = str.length;
                re = /^\d{2}[-]\d{2}[-]\d{4}$/;
                if(!re.test(str)){
                  re = /^\d{2}[-]\d{4}$/;         
                  if(!re.test(str)) re = /^\d{4}$/;            
                }
                sms = 'Formato data errato.';
                break;
            case 'cf':
                re = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
                sms = 'il testo non rappresenta un codice fiscale valido';//scope.getLabel('alert_label_cap');
                break;
            case 'piva':
                re = /^[0-9]{11}$/;
                sms = 'il testo non rappresenta una partita iva valida';
                break;
            case 'pivacf':
                var o = regexUtils(str,'piva');
                if(!o.valid) o = regexUtils(str,'cf');
                if(!o.valid) return {valid:false,sms:'la stringa non rappresenta nè una partita iva nè un codice fiscale validi'};
                return regexUtils(str,false);
            case 'custom':
                if(el){
                    var reg = scope.strToObj(el.data('regex'));
                    for(var r in reg){
                        var pat = new RegExp(reg[r].reg);
                        if(!pat.test(str)) return {valid:false,sms:reg[r].sms};
                    
                    } 
                }
                return {valid:true};  
            default:
                return {valid:true};
        }
        return {valid:re.test(str),sms:sms};
	};
 
})(window.CMS = window.CMS || {});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
};

Number.prototype.format = function(n, x, s, c, suffix) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || '.')) + (suffix || '');
};

(function($){
  $.fn.extend({
    limiter: function(limit, elem) {
      $(this).on("keyup focus", function() {
        setCount(this, elem);
      });
      function setCount(src, elem) {
        var chars = src.value.length;
        if (chars > limit) {
          src.value = src.value.substr(0, limit);
          chars = limit;
        }
        elem.html( limit - chars );
      }
      setCount($(this)[0], elem);
    }
  });
})(jQuery);

// end file

/**
 * circles - v0.0.6 - 2015-11-27
 *
 * Copyright (c) 2015 lugolabs
 * Licensed
 */
!function (a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define([], b) : a.Circles = b()
}(this, function () {
    "use strict";
    var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
            setTimeout(a, 1e3 / 60)
        }, b = function (a) {
        var b = a.id;
        if (this._el = document.getElementById(b), null !== this._el) {
            this._radius = a.radius || 10, this._duration = void 0 === a.duration ? 500 : a.duration, this._value = 0, this._maxValue = a.maxValue || 100, this._text = void 0 === a.text ? function (a) {
                return this.htmlifyNumber(a)
            } : a.text, this._strokeWidth = a.width || 10, this._colors = a.colors || ["#EEE", "#F00"], this._svg = null, this._movingPath = null, this._wrapContainer = null, this._textContainer = null, this._wrpClass = a.wrpClass || "circles-wrp", this._textClass = a.textClass || "circles-text", this._valClass = a.valueStrokeClass || "circles-valueStroke", this._maxValClass = a.maxValueStrokeClass || "circles-maxValueStroke", this._styleWrapper = a.styleWrapper === !1 ? !1 : !0, this._styleText = a.styleText === !1 ? !1 : !0;
            var c = Math.PI / 180 * 270;
            this._start = -Math.PI / 180 * 90, this._startPrecise = this._precise(this._start), this._circ = c - this._start, this._generate().update(a.value || 0)
        }
    };
    return b.prototype = {
        VERSION: "0.0.6", _generate: function () {
            return this._svgSize = 2 * this._radius, this._radiusAdjusted = this._radius - this._strokeWidth / 2, this._generateSvg()._generateText()._generateWrapper(), this._el.innerHTML = "", this._el.appendChild(this._wrapContainer), this
        }, _setPercentage: function (a) {
            this._movingPath.setAttribute("d", this._calculatePath(a, !0)), this._textContainer.innerHTML = this._getText(this.getValueFromPercent(a))
        }, _generateWrapper: function () {
            return this._wrapContainer = document.createElement("div"), this._wrapContainer.className = this._wrpClass, this._styleWrapper && (this._wrapContainer.style.position = "relative", this._wrapContainer.style.display = "inline-block"), this._wrapContainer.appendChild(this._svg), this._wrapContainer.appendChild(this._textContainer), this
        }, _generateText: function () {
            if (this._textContainer = document.createElement("div"), this._textContainer.className = this._textClass, this._styleText) {
                var a = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    textAlign: "center",
                    width: "100%",
                    fontSize: .7 * this._radius + "px",
                    height: this._svgSize + "px",
                    lineHeight: this._svgSize + "px"
                };
                for (var b in a)this._textContainer.style[b] = a[b]
            }
            return this._textContainer.innerHTML = this._getText(0), this
        }, _getText: function (a) {
            return this._text ? (void 0 === a && (a = this._value), a = parseFloat(a.toFixed(2)), "function" == typeof this._text ? this._text.call(this, a) : this._text) : ""
        }, _generateSvg: function () {
            return this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this._svg.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this._svg.setAttribute("width", this._svgSize), this._svg.setAttribute("height", this._svgSize), this._generatePath(100, !1, this._colors[0], this._maxValClass)._generatePath(1, !0, this._colors[1], this._valClass), this._movingPath = this._svg.getElementsByTagName("path")[1], this
        }, _generatePath: function (a, b, c, d) {
            var e = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return e.setAttribute("fill", "transparent"), e.setAttribute("stroke", c), e.setAttribute("stroke-width", this._strokeWidth), e.setAttribute("d", this._calculatePath(a, b)), e.setAttribute("class", d), this._svg.appendChild(e), this
        }, _calculatePath: function (a, b) {
            var c = this._start + a / 100 * this._circ, d = this._precise(c);
            return this._arc(d, b)
        }, _arc: function (a, b) {
            var c = a - .001, d = a - this._startPrecise < Math.PI ? 0 : 1;
            return ["M", this._radius + this._radiusAdjusted * Math.cos(this._startPrecise), this._radius + this._radiusAdjusted * Math.sin(this._startPrecise), "A", this._radiusAdjusted, this._radiusAdjusted, 0, d, 1, this._radius + this._radiusAdjusted * Math.cos(c), this._radius + this._radiusAdjusted * Math.sin(c), b ? "" : "Z"].join(" ")
        }, _precise: function (a) {
            return Math.round(1e3 * a) / 1e3
        }, htmlifyNumber: function (a, b, c) {
            b = b || "circles-integer", c = c || "circles-decimals";
            var d = (a + "").split("."), e = '<span class="' + b + '">' + d[0] + "</span>";
            return d.length > 1 && (e += '.<span class="' + c + '">' + d[1].substring(0, 2) + "</span>"), e
        }, updateRadius: function (a) {
            return this._radius = a, this._generate().update(!0)
        }, updateWidth: function (a) {
            return this._strokeWidth = a, this._generate().update(!0)
        }, updateColors: function (a) {
            this._colors = a;
            var b = this._svg.getElementsByTagName("path");
            return b[0].setAttribute("stroke", a[0]), b[1].setAttribute("stroke", a[1]), this
        }, getPercent: function () {
            return 100 * this._value / this._maxValue
        }, getValueFromPercent: function (a) {
            return this._maxValue * a / 100
        }, getValue: function () {
            return this._value
        }, getMaxValue: function () {
            return this._maxValue
        }, update: function (b, c) {
            if (b === !0)return this._setPercentage(this.getPercent()), this;
            if (this._value == b || isNaN(b))return this;
            void 0 === c && (c = this._duration);
            var d, e, f, g, h = this, i = h.getPercent(), j = 1;
            return this._value = Math.min(this._maxValue, Math.max(0, b)), c ? (d = h.getPercent(), e = d > i, j += d % 1, f = Math.floor(Math.abs(d - i) / j), g = c / f, function k(b) {
                if (e ? i += j : i -= j, e && i >= d || !e && d >= i)return void a(function () {
                    h._setPercentage(d)
                });
                a(function () {
                    h._setPercentage(i)
                });
                var c = Date.now(), f = c - b;
                f >= g ? k(c) : setTimeout(function () {
                    k(Date.now())
                }, g - f)
            }(Date.now()), this) : (this._setPercentage(this.getPercent()), this)
        }
    }, b.create = function (a) {
        return new b(a)
    }, b
});
// end circliful