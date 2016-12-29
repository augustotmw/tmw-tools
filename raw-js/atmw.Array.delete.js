
/*

returns array without deleted items

example: [3,5,7].delete([2,7,4,3]);

*/


Array.prototype.delete = function() { 
    var arr = this;
    var todel = arguments[0];
    if(todel && todel instanceof Array) {
        var arraux = [];
        for(var i=0; i<todel.length;i++) {
            arr.some(function(el, j){
                if(el == todel[i]){
                    arraux.push(j+'');
                };
                return el == todel[i];
            });
        };
        arraux = arraux.sort();
        for(var i=arraux.length-1;i>=0;i--) {
            arr.splice(arraux[i],1);
        };
        return arr;
    } else {
        return false;
    };
};