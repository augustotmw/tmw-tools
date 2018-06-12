angular.module("MyApp",[]).directive("lengthCounter", ["ZeppelinDefaults","$timeout", function(defaults, $timeout){
    return {
        restrict: "A",
        link: function(scope, element, attrs){

            var target = false;
            var length = 0;
            var maxlength = false;

            if(attrs.lengthCounter == "$parent") {
                target = element.parent();
            } else if(attrs.lengthCounter != "") {
                target = angular.element(attrs.lengthCounter);
            } else {
                target = element;
            }

            if(target.nextAll('legend.counter').length) {
                var counter = target.nextAll('legend.counter');
            } else {
                var counter = angular.element('<legend class="counter"></legend>').insertAfter(target);
            }

            

            if(attrs.maxlength && attrs.maxlength != "") {
                maxlength = parseInt(attrs.maxlength);
            }

            var _executing = false;

            var _setCounterText = function(){
                if(!_executing) {
                    _executing = true;
                    // console.log("counter: ", (new Date().getTime()));
                    length = (attrs.ngModel && attrs.ngModel != "" && eval("scope."+attrs.ngModel)) ? eval("scope."+attrs.ngModel+".length") : element.val().length;
                    var text = "$i";
                    if(maxlength) {
                        text = attrs.counterText ? attrs.counterText : "$i caracteres restantes.";
                        text = text.replace("$i", (maxlength-length));
                    } else {
                        text = attrs.counterText ? attrs.counterText : "$i caracteres.";
                        text = text.replace("$i", (length));
                    }
                    counter.text(text);
                    _executing = false;
                }
            }

            _setCounterText();
            
            element.on("keyup", _setCounterText).on("focus", _setCounterText).on("blur", _setCounterText).on("change", _setCounterText);

        }
    }
}]);