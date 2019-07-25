{

    version: 1.04,
    
    map: false, 
    
    bounds: false,

    pdis: {}, // punti
    
    pdid: 0,  // id pdi
    
    maxPdis: 10, // massimo numero di punti
    
    // percorso delle icone
    icons: '/admove-agenzie/assets/img/maps/',
    
    // layout base del popup del singolo punto
    infoContent: '<div id="content"><div class="info" id="info{id}"><h2 class="title">-</h2><div class="media"><div class="media-left"><i class="fas fa-map-marker-alt color-red"></i></div><p class="media-body"><span class="address">-</span></p></div><div class="media mt-5 mb-10"><div class="media-left"><div class="media-object phone" style="color:#666"></div></div></div><h3 class="title-small">Gestisci PDV</h3><div class="buttons"><a data-id="0" data-maps="reset" class="map-reset" title="Resetta il centro di pianificazione">Reset</a><a data-id="0" data-maps="remove" class="map-remove" title="Rimuovi il Punto Vendita e la pianificazione">Elimina</a><a data-id="0" data-maps="duplicate" class="map-duplicate" title="Duplica il Punto Vendita">Duplica</a><a data-id="0" data-maps="update" class="map-update npulse" title="Ricalcola gli insight"><span>Aggiorna</span><span></span></a></div></div></div>',
    
    infoWindow: false,

    text: { // strings
        title_add_pdi: 'Aggiungi un punto',
        desc_add_pdi: 'Inserisci un indirizzo e cerca la tua attività',
        alert_pdi_exists: 'Il punto selezionato risulta già presente. Sei sicuro di volerne aggiungere un altro nella stessa posizione?',
        alert_pdi_reset: 'Sei sicuro di voler resettare il punto?',
        alert_pdi_remove: 'Sei sicuro di voler rimuovere il punto <b>{pdi}</b>',
        alert_max_pdis: 'Spiacente, non puoi aggiungere più di {tot} punti.',
        txt_yes: 'Sì',
        txt_no: 'No'
    },
    
    pdi: { // pdi base
        
        scope: false,
        id: false,
        number: 0,
        image:false,
        init: {
            lat: 0,
            lng: 0,
            radius: 2,
            address: ''
        },
        offset: {
            lat: 0,
            lng: 0
        },
        lat: 0,
        lng: 0,
        title: 'Custom PDI',
        address: '',
        phoneNumber: '',
        duplicable: true,
        resettable: true,
        cancelable: true,
        editable: true,
        updated: false,
        marker: false,
        circles: false,
        circlesDragMarker: false,
        selected: false,
        lines: false,
        info: false,
        circle: {        
            lat: false,
            lng: false,
            radius: 1500            
        },
        
        insights: {
            lat: 0,
            lng: 0,
            radius: 0,
            data: {} // dati di insights relativi a lat,lng,radius (forse insegna o altro)
        },
        
        budget: {},
        
        creativity: {},
        
        vlat: function(){
            return this.lat + this.offset.lat;
        },
        
        vlng: function(){
            return this.lng + this.offset.lng;
        },
        
        _removeElementListener: function(element,listeners,tonull){
            var t = this;
            for (var l = 0; l < listeners.length; l++) google.maps.event.clearListeners(element, listeners[l]);            
            if(tonull) element.setMap(null);
        },
        
        _setElementListener: function(element,listeners){
            var t = this;
            $.each(listeners,function(i,e){            
                google.maps.event.addListener(element, e.event, function(evt) {
                    if(e.options) this.setOptions(e.options);
                    if(e.callback) e.callback(evt,this,element);
                });            
            });  
        },
        
        _setCircles: function(radius){ // creo serie di circles in base a radius
            var t = this, r = radius;
            t.circle.radius = radius;            
            if(!t.circles){
                t.circles = [];
                var center = new google.maps.LatLng(t.circle.lat,t.circle.lng);
                var title = (t.editable) ? 'Trascina la circonferenza per spostare il raggio di pianificazione' : t.title;
                for(var i = 0; i < 4; i++){
                    
                    var options = {
                        strokeColor: '#465568',
                        strokeOpacity: 0,
                        strokeWeight: 0,
                        fillColor: '#465568',
                        fillOpacity: 0.2,
                        map: t.scope.map,
                        center: center,
                        radius: radius,
                        title: title,
                        zIndex: (5 - i),
                        draggable: t.editable
                    };
                    
                    var circle = new google.maps.Circle(options);
                    
                    if(i == 0){
                        /*
                        t._setElementListener(circle,[{event:'mouseover',options:{fillOpacity:.4}},{event:'mouseout',options:{fillOpacity:.2}},{event:'click',callback:function(evt){
                            t.scope.actions('select',t.id);
                        }}]);*/
                        t._setElementListener(circle,[{event:'mouseover',options:{fillOpacity:.4},callback:function(evt){
                            options.map.getDiv().setAttribute('title',circle.get('title'));
                        }},{event:'mouseout',options:{fillOpacity:.2},callback:function(evt){
                            options.map.getDiv().removeAttribute('title');
                        }},{event:'click',callback:function(evt){
                            t.scope.actions('select',t.id);
                        }}]);
                        
                        if(t.editable){
                            t._setElementListener(circle,[{event:'drag',callback:function(evt,obj){
                                var center = obj.getCenter();
                                t.circle.lat = center.lat();
                                t.circle.lng = center.lng();
                                for (var c = 0; c < t.circles.length; c++) if (c != 0) t.circles[c].setOptions({ center: center });
                                t._setLines();   
                            }},{event:'dragend',callback:function(evt,obj){
                                if (!t.selected) t.scope.actions('select', t.id);
                                t.setUpdated(false).setResettable().scope.actions('dragend', t.id);
                            }}]);
                        }
                    }
                    
                    t.circles.push(circle);
                    
                    radius -= r/4;
            
                }
                
                t._setCircleDragMarker();
                
            }else{
                var center = new google.maps.LatLng(t.circle.lat, t.circle.lng);
                for (var i = 0; i < t.circles.length; i++){
                    t.circles[i].setOptions({radius:radius,center:center});
                    radius -= r/4;
                }
            }           
            
        },
        
        _setCircleDragMarker: function(reset){

            var t = this;
            
            if(!t.circlesDragMarker){
            
                var objs = [
                    {rotation: 0, setPosition: function(circle){
                        this.marker.setPosition( new google.maps.LatLng( circle.getBounds().getNorthEast().lat(), circle.getCenter().lng() ) );
                    }}, // top
                    {rotation: 90, setPosition: function(circle){
                        this.marker.setPosition( new google.maps.LatLng( circle.getCenter().lat(), circle.getBounds().getNorthEast().lng() ) );
                    }}, // right
                    {rotation: 0, setPosition: function(circle){
                        this.marker.setPosition( new google.maps.LatLng( circle.getBounds().getSouthWest().lat(), circle.getCenter().lng() ) );
                    }}, // bottom
                    {rotation: 90, setPosition: function(circle){
                        this.marker.setPosition( new google.maps.LatLng( circle.getCenter().lat(), circle.getBounds().getSouthWest().lng() ) );
                    }} // left
                ];

                for (var o = 0; o < objs.length; o++){
                
                    objs[o].marker = new google.maps.Marker({
                        map: t.scope.map,
                        title: 'Modifica il raggio',
                        draggable: false,//t.editable,
                        icon: {
                            url: t.scope.icons + '2x2.png',//'resize'+objs[o].rotation+'.png',
                            anchor: new google.maps.Point(12,12)
                        }
                    });
                    
                    objs[o].marker.setVisible(false);
                    
                    objs[o].setPosition( t.circles[0] );
                    
                    if(!t.editable) continue;
                    
                    continue; // no listeners
                    
                    t._setElementListener(objs[o].marker,[{event:'drag', callback:function(evt, pdi, element){
                        var distance = t.scope.getDistance(element.getPosition(), t.circles[0].getCenter()); // distanza fra marker e centro circle
                        if(distance > 25000){
                            distance = 25000;
                        }else if(distance < 15000){
                            distance = 15000;
                        }
                        t._setCircles(distance);
                        for (var d = 0; d < t.circlesDragMarker.length; d++) t.circlesDragMarker[d].setPosition(t.circles[0]);
                    }},{event:'dragend',callback:function(){
                        t.setUpdated(false);
                    }}]);
                }
                
                t.circlesDragMarker = objs;
                
            }
            
            return t;
 
        },
        
        _setMarker: function(){
            /*var t = this;
            if(!t.marker){
                t.marker = new google.maps.Marker({
                  zIndex:1000,
                  map: t.scope.map,
                  title: t.title
                });
                
                t._setElementListener(t.marker,[{event:'click',callback:function(){
                    t.scope.actions('select',t.id);
                    t.scope.fitBounds(t);
                }}]);
            }
            t.marker.setPosition(new google.maps.LatLng(t.vlat(), t.vlng()));
            t._setMarkerIcon();
            return t;*/
            var t = this;
            if(!t.marker){
                
                t.markerOver = new google.maps.Marker({
                    map: t.scope.map,
                    zIndex:20,
                    title: t.title,
                    clickable:true  
                });
                
                t.marker = new google.maps.Marker({
                  zIndex:10,
                  map: t.scope.map,
                  title: t.title,
                  clickable:false
                });

                t._setElementListener(t.markerOver,[{event:'click',callback:function(){
                    t.scope.actions('select',t.id);
                    t.scope.fitBounds(t);
                }},{event:'mouseover',callback:function(){
                
                    t._setMarkerIcon({fillOpacity:.7,label:'LABEL_SELECTED'});
                
                }},{event:'mouseout',callback:function(){
                
                    t._setMarkerIcon();
                
                }}]);
            }
            t.markerOver.setPosition( new google.maps.LatLng(t.lat,t.lng) );
            t.marker.setPosition( new google.maps.LatLng(t.lat,t.lng) );
            t._setMarkerIcon();
            return t;             
        },
        
        _setLines: function(){
            var t = this;
            if(!t.lines){
                t.lines = new google.maps.Polyline({
                  path: [],
                  geodesic: true,
                  strokeColor: '#465568',
                  strokeOpacity: 1.0,
                  strokeWeight: 1,
                  map:t.scope.map
                });
            }
            
            var path = [{lat:t.marker.getPosition().lat(),lng:t.marker.getPosition().lng()},{lat:t.circles[0].getCenter().lat(),lng:t.circles[0].getCenter().lng()}];
            t.lines.setPath(path);
            for (var d = 0; d < t.circlesDragMarker.length; d++) t.circlesDragMarker[d].setPosition(t.circles[0]);
        },
        
        _checkRotation: function(){ // ottengo la rotazione in base a raggruppamenti di lat,lng
        
            var group = {}, rotation = 0, l = 0;
            /*
            console.log('check rot');
            console.log(this.scope);
            console.log(this.scope.pdis); */
            
            for(var pdi in this.scope.pdis){
            
                var lat = this.scope.pdis[pdi].lat, lng = this.scope.pdis[pdi].lng, nmb = this.scope.pdis[pdi].number;

                if(!group[lat + '_' + lng]) group[lat + '_' + lng] = [];
                
                console.log('group: '+lat + '_' + lng);
                
                group[lat + '_' + lng].push(nmb);
                
            }
            
            for(var g in group){
            
                l = group[g].length;
                
                group[g].sort(function(a,b){
                    return parseInt(a) - parseInt(b);
                });

                if(g == this.lat + '_' + this.lng){ // siamo nel gruppo attuale
                
                    for(var i = 0; i < l; i++){
                    
                        if(this.number == group[g][i]) rotation = 36*i; // 360/(l-i);//
                        
                    }
                
                }
                
            }

            return rotation;
        
        },

        _setMarkerIcon: function(opt){ 
               
            if(!this.marker) return;   
             
            var icon = {

              path: 'M12.6,0h0A12.6,12.6,0,0,0,0,12.6a13.86,13.86,0,0,0,1,4.83L12.6,70,24.29,17.3a13.79,13.79,0,0,0,.91-4.7A12.6,12.6,0,0,0,12.6,0Z',
              fillColor: '#071a21',
              fillOpacity: 1,
              scale: 1,
              strokeWeight: 2,
              strokeColor: '#fff',
              strokeOpacity: .3,
              rotation: this._checkRotation(),
              anchor: new google.maps.Point(13, 70),
              labelOrigin:new google.maps.Point(12.5,12)
            };

            var label = 'LABEL', ic = {path: google.maps.SymbolPath.CIRCLE,scale: 10,strokeWeight: 0,strokeOpacity:0,rotation:icon.rotation,anchor: new google.maps.Point(0, 6)};
                this.markerOver.setIcon(ic);
            
            if(opt) for(var o in opt) icon[o] = opt[o];
            if(this.selected || (opt && opt.label)) label = 'LABEL_SELECTED';

            this.marker.setLabel({text:this.number+'',fontFamily:label});
            this.marker.setIcon(icon);          
                        
        },
        
        _old_setMarkerIcon: function(){        
            if(!this.marker) return;            
            icon = {
                url: this.scope.icons + this.number + '-' + this._getSelected() + '.png',
                anchor: new google.maps.Point(24, 34)
            }
            this.marker.setIcon(icon);            
        },
        
        _getSelected: function(){        
            if(this.selected) return 'on';
            return 'off';        
        },
        
        update: function(){ // redraw circle
            //console.log('update',this.circle);
            this._setCircles(this.circle.radius);
            this._setLines();
            return this;
        },
        
        setInfoContent: function(html){
            this.info = $(html);
            this.info.find('[data-id]').attr('data-id',this.id);
            
            if(this.title) this.info.find('.title').html(this.title);
            if(this.address) this.info.find('.address').html(this.address);
            if(this.phoneNumber) this.info.find('.phone').html('<b class="color-blue" style="margin-right:4px">T:</b> '+this.phoneNumber);
            
            if(!this.cancelable) this.info.find('a[data-maps=remove]').remove();
            if(!this.duplicable) this.info.find('a[data-maps=duplicate]').remove();
            if(!this.resettable) this.info.find('a[data-maps=reset]').remove();
            if(!this.editable) this.info.find('a[data-maps=update]').remove();
            
            return this;
        },
        
        getInfoContent: function(){
            if(this.info){
                return this.info.css('opacity', .5).html().replace('{id}', this.id);
            }
            return '-';
        }, 
        
        setNumber: function(num){
            if(this.number == num) return false;
            $('body').find('[data-id='+this.id+'] .number').text(num);
            this.number = num;
            this._setMarkerIcon();
            this.setUpdated(false);
            return this;
        },
        
        setBudget: function(data){ 
            this.budget = data;       
            /*this.budget.id = id;
            this.budget.price = price;*/
            //this.setUpdated(false);
            return this;
        },
        
        setInsights: function(data){
            this.insights.lat = this.circle.lat;
            this.insights.lng = this.circle.lng;
            this.insights.data = data;
            this.setUpdated(false);
            return this;
        },
        
        setUpdated: function(flag){ // cambia lo stato del bottone di aggiornamento
            if(!this.info || this.updated === flag) return this;

            if(flag){
                this.info.find('[data-maps=update]').addClass('disable');
            }else{
                this.info.find('[data-maps=update]').removeClass('disable');
            }
            this.updated = flag;
            this.scope.actions('updated_list',this.id);
            this.scope.openWindow(this.id);
            return this;
        },
        
        setResettable: function(){        
            if(this.init.lat !== this.circle.lat && this.init.lng !== this.circle.lng) this.info.find('[data-maps=reset]').removeClass('disable');    
            else this.info.find('[data-maps=reset]').addClass('disable');
            this.scope.openWindow(this.id);
            return this;        
        },
        
        create: function(lat,lng,radius){ 
            this.lat = this.init.lat = lat;
            this.lng = this.init.lng = lng;
            if(this.circle.lat == false) this.circle.lat = lat;
            if(this.circle.lng == false) this.circle.lng = lng;
            this.circle.radius = this.init.radius = radius;       
            this._setCircles(radius);
            this._setMarker();
            this._setLines();
            return this.setResettable().setUpdated(true);         
        },
        
        remove: function(){
            var t = this;
            if (t.marker) t._removeElementListener(t.marker, [], true);
            if (t.markerOver) t._removeElementListener(t.markerOver, ['click','mouseover','mouseout'], true); 
            if (t.circles) for (var c = 0; c < t.circles.length; c++) t._removeElementListener(t.circles[c], ['mouseover', 'mouseout', 'drag', 'dragend', 'click'], true);
            if (t.circlesDragMarker) for (var d = 0; d < t.circlesDragMarker.length; d++) t._removeElementListener(t.circlesDragMarker[d].marker, ['drag', 'dragend'], true);
            if(t.lines) t.lines.setMap(null);
            t.marker = t.circles = t.lines = t.circlesDragMarker = false;
            return true;
        },
        
        select: function(flag){        
            if(this.selected == flag) return this;        
            this.selected = flag; 
            this._setMarkerIcon();            
            if(this.selected){
                this.scope.openWindow(this.id);
                $('.pdis [data-id='+this.id+']').addClass('selected');
                $('.budget [data-id=' + $.escapeSelector(this.budget.id)+']').addClass('selected');
                // imposto tutti i dati
            }else{
                $('.pdis [data-id='+this.id+']').removeClass('selected');
                $('.budget [data-id]').removeClass('selected');
            }            
            return this;        
        },
        
        changeLocation: function(lat, lng, radius) {
            //this.init.address = this.address = address;
            //this.title = title;
            this.circle.lat = lat;
            this.circle.lng = lng;
            this._setCircles(radius); // up circle
            this._setLines();
            //this.reset()._setMarker().setInfoContent(this.scope.infoContent).select(false).select(true);
        },
        
        reset: function() {
            this.circle.lat = this.lat = this.init.lat;
            this.circle.lng = this.lng = this.init.lng;
            this.circle.radius = this.init.radius;
            return this.update().setUpdated(false);
        },
        
        duplicate: function() {
            var newId;
            for (var x = 1; x < 10; x++) {
                newId = this.id + "_" + x;
                if (!this.scope.pdis[newId]) {
                    break;
                }
            }
            //debugger;
            return this.scope.addPoint({ id: newId, originalId: this.id, lat: this.lat, lng: this.lng, offset: { lat: 0, lng: 0}, title: this.title, address: this.address, phoneNumber: this.phoneNumber, image: this.image, circle: { lat: this.circle.lat, lng: this.circle.lng, radius: this.circle.radius } }, true, true);
        },
        
        data: function(){        
            return {circle:this.circle,budget:this.budget,lat:this.lat,lng:this.lng};        
        }
        
    },
    
    opt: {    
        zoom: 11,        
        lat:  45.4637307,        
        lng:  9.1910625    
    },
    
    callback: false,
    
    /**
     *  inizializzo il plugin
     *  - id: id del div della mappa
     *  - opt: opzioni iniziali della mappa: zool, center(lat,lng)
     *  - callback: la funzione che verrà sempre richiamata per ogni evento legato ai punti
     */
    init: function(id, opt, callback){
        if(!google || !google.maps) return CMS.openAlert({html:'Google Maps was not loaded!'});

        var t = this;
        
        t.icons = CMS.BASEPATH + t.icons;
        
        t.callback = callback;

        if(!t.callback) t.callback = function(){};
        
        if(opt) t.opt = $.extend(t.opt, opt);
        
        this.map = new google.maps.Map(document.getElementById(id), {
            zoom: t.opt.zoom,
            center: new google.maps.LatLng(t.opt.lat,t.opt.lng),
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            panControl: false,
            panControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel:false
        });

        t.bounds = new google.maps.LatLngBounds();
        
        t.infoWindow = new google.maps.InfoWindow({
          content: t.info,
          maxWidth:480
        });

    },
    
    /**
     *  riporto la mappa allo stato iniziale
     */
    restoreMap: function(){
        var t = this;
        t.map.setCenter(new google.maps.LatLng(t.opt.lat,t.opt.lng));
        t.map.setZoom(t.opt.zoom);
    },    
    
    /**
     *  apre la finestra di azioni per il punto selezionato
     */
    openWindow: function(pdid){ // open info window
    
        if(!this.pdis[pdid]) return this;

        this.infoWindow.setContent( this.pdis[pdid].getInfoContent() );
        
        this.centerMap(this.pdis[pdid]);
        
        this.infoWindow.open(this.map, this.pdis[pdid].markerOver);

        return this;
 
    },
    
    /**
     *  creo un punto. I parametri di creazione sono specificati nella variabile "pdi" di volta in volta clonata
     *  parametri base:
     *  - title
     *  - address
     *  - lat
     *  - lng
     */
    addPoint: function(opt, stopBounds, duplicated){ // add point
        var t = this;
    
        if(this.getCount() >= t.maxPdis){
        
            CMS.openAlert({html: t.text.alert_max_pdis.replace('{tot}',this.getCount()),apas:true});
            
            return false;
            
        }

        //console.log('add pdv');
        //console.log(opt);
        if(opt) opt.updated = false;
    
        var pdi = $.extend(true, {}, this.pdi, opt);
        
        t.pdid ++;
        //'ID_' + t.pdid
        
        // non trovava opt.id... lo inserisco automaticamente
        pdi.id = opt.id || t.pdid+'';
        
        pdi.setNumber(t.getCount() + 1);
        
        pdi.scope = t;
        
        pdi.setInfoContent(this.infoContent);

        pdi.create(pdi.lat,pdi.lng,pdi.circle.radius ? pdi.circle.radius : pdi.radius == undefined ? pdi.circle.radius : pdi.radius);   
        
        this.pdis[pdi.id] = pdi;
        
        //if(duplicated === true) t.actions('cloned',pdi.id);
        
        /*if(!stopBounds) this.fitBounds(pdi);
        else this.actions('select',pdi.id);*/
        if(this.getCount() == 1){ // solo un pdv
            this.fitBounds(pdi);
        }else{
            this.fitBounds();
        }
        
        // ogni ultimo punto aggiunto risulta selezionato
        setTimeout(function(){
            t.actions('select',pdi.id);
        },200); 
        //this.actions('select',pdi.id);
        
        return this.pdis[pdi.id];
    
    },
    
    /**
     *  aggiorno un punto
     */
    updatePoint: function(pdid, opt){
    
        if(!this.pdis[pdid]) return;//CMS.openAlert({html:'PDV non trovato'});
    
    },
    
    /**
     *  elimino un punto in base al suo id
     */
    removePoint: function(pdid){  
        var pdi = this.pdis[pdid];  
        if(!pdi) return;// CMS.openAlert({html:'PDV non trovato'});
        if(pdi.remove()){
            delete this.pdis[pdid];
            var number = 1;
            for (var p in this.pdis){
                this.pdis[p].setNumber(number);
                number ++;
            }            
        }
        return pdi;
    },
    
    /**
     *  ottengo la lista dei punti in formato oggetto o array (se specificato a true)
     */
    getList: function(to_array){    
        if(!to_array) return this.pdis;        
        var arr = [];
        for (var i in this.pdis) arr.push(this.pdis[i]);        
        return arr;
    },
    
    /**
     *  ottengo il numero intero dei punti
     */
    getCount: function(){        
        var n = 0;
        for (var i in this.pdis) if (this.pdis[i]) n++;
        return n;
    },
    
    /**
     *  verifica l'esistenza di un punto in base a longitudine e latitudine
     */
    checkExists: function(lat, lng) {
        for (var i in this.pdis) if (lat == this.pdis[i].lat && lng == this.pdis[i].lng) return this.pdis[i];
        return false;    
    },
    
    /**
     *  Ottengo il punto selezionato o false
     */
    getSelected: function() {
        for (var i in this.pdis) if(this.pdis[i].selected) return this.pdis[i];
        return false;
    },
  
    rad: function(x){
        return x * Math.PI / 180;
    },
    
    rand: function(){
        var min = -2, max = 2;
        return (Math.random() * (max - min) + min) / 150;
    },
    
    countDuplicates: function(pdi){
    
        if(!pdi) return 0;
    
        var count = 0;

        for(var p in this.pdis){
        
            if(this.pdis[p].id == pdi.id) continue;
            
            if(this.pdis[p].title == pdi.title) count++;
        
        }
        
        return count;
    
    },
    
    /**
     *  azioni per singolo pdv:
     *  -- add(ed)
     *  -- remove(d)
     *  -- update(d)
     *  -- duplicate(d)
     *  -- reset(ted)
     *  -- select(ed)
     *  il metodo invia i parametri alla callback impostata in fase di inizializzazione (evt, pdv)
     *  possono essere impostati eventi custom direttamente da qui.
     *  preso in incarico un evento, se completata un'azione, è possibile modificarlo direttamente (es. add to added),
     *   oppure bloccarne la propagazione (return false) nel caso l'azione preveda una chiamata temporizzata (ajax, dialog di conferma)
     */
    actions: function(evt,id,data){ // 
    
        var t = this, pdi = t.pdis[id];
    
        if( (!pdi && evt !== 'add') || evt == 'add-pdi') return t.callback(evt,false);
    
        if(evt == 'remove'){ // rimuovo un punto
        
            var title = pdi.title;
            
            //console.log('duplicates: '+t.countDuplicates(pdi));
            
            if(t.countDuplicates(pdi) > 0) title = pdi.title + ' - ' + pdi.address;

            BootstrapDialog.show({
                title: t.text.alert_pdi_remove.replace('{pdi}',title),
                buttons: [{
                    label: 'Sì',
                    cssClass: 'btn-adm short mr-15',
                    action: function(dialogItself){
                        t.removePoint(id);
                        t.fitBounds();
                        dialogItself.close();
                        t.callback('removed', id);
                        t.actions('updated_list', id);
                        //console.log('COUNT: '+t.getCount());
                        if (t.getCount() <= 0) t.callback('clear', true);
                        return false;                    }
                }, 
                {
                    label: 'No',
                    cssClass: 'btn-adm light short',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            
            return false;

        }else if(evt == 'update'){ // aggiorno un punto. Eventuale chiamata ajax andrebbe predisposta qui
        
            // disabilito il bottone aggiorna
            pdi.setUpdated(true);           

        }else if(evt == 'add'){ // aggiungo un punto
            pdi = t.addPoint(data);
            
            evt += 'ed';
            
        }else if(evt == 'duplicate'){ // duplico un punto esistente
        
            pdi = pdi.duplicate();
            
            evt += 'd';
        
        }else if(evt == 'reset'){ // resetto valori pdv

            BootstrapDialog.show({
                title: t.text.alert_pdi_reset,
                message: null,//t.text.alert_pdi_reset,
                buttons: [{
                    label: 'Sì',
                    title: 'Sì',
                    cssClass: 'btn-adm short mr-15',
                    action: function(dialogItself){
                        pdi.reset();
                        dialogItself.close();
                        return t.actions('resetted',id);
                    }
                }, 
                {
                    label: 'No',
                    cssClass: 'btn-adm light short',
                    action: function(dialogItself){
                        dialogItself.close();
                    }
                }]
            });
            
            return false;
        
        } else if (evt == 'select') {
            for (var p in t.pdis) t.pdis[p].select(false);
            
            pdi.select(true);
            
            t.centerMap(pdi);
            
            evt += 'ed';
 
        }else if( evt == 'resetted'){
        
            pdi.setResettable();
        
        }else if( evt == 'updated_list'){
        
            data = [];
            
            $.each(t.pdis,function(i,e){
                if(e.updated === false) data.push(e);
            });
        
        }
        
        t.callback(evt, pdi, data);
    
    },
    
    
    //centra la mappa su un particolare punto
    centerMap: function(pdi){
    
        if(pdi) this.map.setCenter(pdi.marker.getPosition());

    },
    
    panMap: function(x,y){

        if(this.map) this.map.panBy(x,y);
        
    },
    
    /**
     *  imposta i bordi della mappa per tutti i punti presenti
     *  la centra in caso venga passato un punto
     */
    fitBounds: function(pdv){
    
        var bounds = new google.maps.LatLngBounds(), n = 0, t = this;

        for (var p in t.pdis){
            if(pdv && pdv.id != t.pdis[p].id) continue;
            //bounds.extend(this.pdis[p].marker.getPosition()); // anche per il marker
            for (var d = 0; d < t.pdis[p].circlesDragMarker.length; d++) bounds.extend(t.pdis[p].circlesDragMarker[d].marker.getPosition());
            n++;
        }
        
        if(pdv) t.map.setCenter(pdv.marker.getPosition());
        
        if(n == 0) return t.restoreMap(); 
        
        t.map.fitBounds(bounds);
        
    },

    //torna la distanza fra due punti
    getDistance: function(p1, p2){
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat() - p1.lat());
        var dLong = this.rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    },
    
    //torna un punto in base al suo id
    getPoint: function(id){
        
        if(this.pdis[id]) return this.pdis[id];
        
        return false;
    
    },
    
    getPointByNumber: function(number){
        for(var i in this.pdis) if(this.pdis[i].number == number) return this.pdis[i];
        return false;
    },
    
    // ottengo il JSON di info utili per tutti i punti aggiunti
    getData: function(){ 
    
        var obj = {};
        
        for(var id in this.pdis) obj[id] = this.pdis[id].data();
        
        return obj;
    
    },

    destroy: function(){
    
        for(var id in this.pdis){
        
            this.pdis[i].remove();
            
            delete this.pdis[i];
        
        }
        
        this.map = false;
    },

    removeAll: function() {
        
        var pdis = this.getList(true);
        /*
        console.log('remove all');
        console.log(this);
        console.log(pdis);*/
        for (var i = 0;  i < pdis.length; i++) {

            pdis[i].remove();

        }
        
        this.pdis = {};
        
    }
    
}