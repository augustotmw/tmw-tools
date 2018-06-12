


angular.module("MyApp",[]).factory("tmwTools", [function(){

    var $tools = {
        scrollTo: function(coordY, config){
            config = angular.extend({}, {
                adjust: 0,
                callback: function(){ return true; },
                menu: 0
            },(config&&(config instanceof Object)?config:{}));

            angular.element("html, body").animate({"scrollTop": (coordY + config.adjust) - config.menu}, this.animation.speed, function(){
                config.callback(coordY, config, this);
            });
        }
    }

    return $tools;
}]);

/**@func tabsBlock
 * @type AngularJS directive
 * @requires AngularJS
  * @desc 
 * @version 0.0.1.2018041001
 * 
 */


angular.module("MyApp",[]).directive("tabsBlock", ["$timeout","$rootScope","tmwTools", function($timeout, $rootScope, tmwTools){
    return {
        restrict: "A",
        link: function(scope, element, attrs){

            var triggers = element.find("[tab]");
            var tabs = element.find(".tabs");
            var panels = element.find("[tab-panel]");
            var _winw = angular.element(window).outerWidth();
            var elClasse = element.prop("class");

            var _ctrl = element.parents("[ng-controller]");
            var ctrlName = _ctrl.length ? _ctrl.attr("ng-controller") : "";
            var tabName = "$tabsBlock";

            element.find("[tab]").on("click", function(ev){
                var $this = angular.element(this);
                var tabnum =  $this.attr("tab");

                if(!$this.hasClass("active")) {
                    angular.element(".tab-item.active", element).removeClass("active");
                    triggers.removeClass("active");
                    panels.removeClass("active");
                    triggers.filter("[tab="+tabnum+"]").addClass("active");
                    var _panel = panels.filter(":eq("+tabnum+")");
                    _panel.addClass("active");
                    _panel.parents(".tab-item:first").addClass("active");

                    element.prop("class", elClasse).addClass("tab-"+tabnum+"-selected");

                    if(_winw < 768){
                        tmwTools.scrollTo(_panel.parents(".tab-item:first").offset().top, {menu: true, adjust: -30});
                    }

                } else {
                    if(_winw < 768){
                        triggers.removeClass("active");
                        panels.removeClass("active");
                    }
                }

                try {
                    attrs.onChangeTab && attrs.onChangeTab != "" ? eval("scope."+(attrs.onChangeTab).replace(/\([\w\W]{0,}/gi,"")+"(tabnum, this, ev)") : false;
                } catch(err) {
                    console.warn("Function \""+attrs.onChangeTab+"\" not found at controllers scope context.");
                }


            });

            var _wInterval = false;

            $(window).on("resize", function(){
                
                    if(_wInterval) {
                        window.clearInterval(_wInterval);
                    }
    
                    _wInterval = window.setInterval(function(){
                        _winw = angular.element(window).outerWidth();
                        if(_winw > 767 && !angular.element(".tab-item.active", element).length) {
                            triggers.filter(":first").trigger("click");
                        }
                        window.clearInterval(_wInterval);
                    },350);
                
            });

            scope.$on("tabsBlock.set.tab", function(ev, tab){

                if((tab || tab == 0) && (typeof tab == "number" || typeof tab == "string")) {
                    var eltab = element.find("[tab="+tab+"]:not(.active):visible");
                    if(eltab.length) {
                        element.find("[tab="+tab+"]:visible").trigger("click");
                    }
                }

            });

            $timeout(function(){
                if(_winw > 767) {
                    var _flux = function(tabnum) {
                        
                        triggers.filter("[tab="+tabnum+"]").addClass("active");
                        var _panel = panels.filter(":eq("+tabnum+")");
                        _panel.addClass("active");
                        _panel.parents(".tab-item:first").addClass("active");

                        element.prop("class", elClasse).addClass("tab-"+tabnum+"-selected");
                    }
                    
                    if(attrs.startAtTab && !isNaN(parseInt(attrs.startAtTab))) {
                        _flux(parseInt(attrs.startAtTab));
                        // triggers.filter(":eq("+attrs.startAtTab+")").trigger("click");
                    } else {
                        _flux(0);
                        // triggers.filter(":first").trigger("click");
                    }
                }
            });

            try {
                attrs.onLoadTabs && attrs.onLoadTabs != "" ? eval("scope."+(attrs.onLoadTabs).replace(/\([\w\W]{0,}/gi,"")+"(element, attrs)") : false;
            } catch(err){
                console.warn("Function \""+attrs.onLoadTabs+"\" not found at controllers scope context.");
            }


        }
    }
}]);



/* 

exemplo html:

            <div class="tabs-block" tabs-block on-change-tab="on.changeTab();">
                <div class="tabs">
                    <div><a href="javascript:;" class="tab" tab="0" tabindex="-1">Tab1</a></div>
                    <div><a href="javascript:;" class="tab" tab="1" tabindex="-1">Tab2</a></div>
                    <div><a href="javascript:;" class="tab" tab="2" tabindex="-1">Tab3</a></div>
                    <div class="active-mark"><span></span></div>
                </div>
                <div class="tab-item chat">
                    <a href="javascript:;" class="tab" tab="0" tabindex="-1">Tab1</a>
                    <div class="panel" tab-panel>
                        <div class="panel-wrap">
                        </div>
                    </div>
                </div>
                <div class="tab-item telefones">
                    <a href="javascript:;" class="tab" tab="1" tabindex="-1">Tab2</a>
                    <div class="panel" tab-panel>
                        <div class="panel-wrap">
                        </div>
                    </div>
                </div>
                <div class="tab-item">
                    <a href="javascript:;" class="tab" tab="2" tabindex="-1">Tab3</a>
                    <div class="panel" tab-panel>
                        <div class="panel-wrap">
                        </div>
                    </div>
                </div>
            </div>



*/