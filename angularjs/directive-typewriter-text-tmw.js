
angular.module("MyApp",[]).directive("typewriter",["ZeppelinDefaults",function(zdefaults){
    return {
        restrict: "A",
        link: function(scope, element, attrs){

            var texts = [];

            element.find("[text]").each(function(i,el){
                el = angular.element(el);
                var model = el.attr("ng-bind");
                var txt = "";
                
                if(el.attr("text") == "") {
                    if(model && model != "" && scope.hasOwnProperty(model)){
                        eval("txt = scope."+model);
                        eval("scope."+model+" = '';");
                    }
                } else {
                    txt = el.attr("text");
                }

                if(txt != "") {
                    texts.push({
                        el: el,
                        text: txt
                    });
                }


            });

            var numf = 0;
            var nump = 0;
            var aux = "";

            var interval = setInterval(function(){
                if(numf >= texts.length) {
                    clearInterval(interval);
                } else {
                    var tag = texts[numf].el;
                    var model = tag.attr("ng-bind");

                    if(nump < texts[numf].text.length) {
                        aux = aux + texts[numf].text.charAt(nump);
                        if(model && model != "" && scope.hasOwnProperty(model)){
                            eval("scope."+model+" = '"+aux+"';");
                            !scope.$$phase ? scope.$digest() : false;
                        } else {
                            tag.text(aux);
                        }
                        nump++;
                    } else {
                        aux = "";
                        nump = 0;
                        numf++;
                    }
                }
            },70);


            var rewriteInterval = null;

            scope.$on("typewriter.rewrite", function(ev, item, text, model){
                if(!isNaN(parseInt(item)) && text && text != "") {
                    var tag = angular.element(element.find('[text]:eq('+item+')'));
                    var str = tag.text();
                    var dct = str.length;
                    var ct = 0;
                    var aux = "";

                    if(!(model && model != "" && typeof model == "string" && scope.hasOwnProperty(model))) {
                        model = false;
                    }

                    if(text != tag.text()) {

                        var updateText = function(text){
                            // console.log("text: ", text);
                            if(model){
                                eval("scope."+model+" = '"+text+"';");
                                // console.log("model: ", eval("scope."+model));
                                !scope.$$phase ? scope.$digest() : false;
                            } else {
                                tag.text(text);
                            }
                        }

                        if(rewriteInterval) {
                            // console.log("rewriteInterval");
                            clearInterval(rewriteInterval);
                            updateText("");
                        }
                                            
                        rewriteInterval = setInterval(function(){
                            if(ct == text.length) {
                                clearInterval(rewriteInterval);
                                rewriteInterval = null;
                            } else {
                                if(dct > 0) {
                                    dct--;
                                    str = str.substr(0,dct);
                                    // console.log("deleting");
                                    updateText(str);
                                } else {
                                    aux = aux + text.charAt(ct);
                                    // console.log("deleting");
                                    updateText(aux);
                                    ct++;
                                }
                            }
                        },70);
                    }
                }
            });


        }
    }
}]);



/* 

exemplo:

    <div typewriter>
        <p><strong>&nbsp;<span text="Texto de muitas linhas,"></span></strong></p>
        <p><strong>&nbsp;<span text ng-bind="usando bind do angular"></span></strong></p>
        <p>&nbsp;<span text="e em tags diferentes,"></span></p>
        <p>&nbsp;<span text="para testar continuidade"></span></p>
    </div>


*/