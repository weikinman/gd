/**
 * Created by TD on 2016/8/27.
 */
(function(root) {
    var slice = [].slice;

    function GD(_,main,utils){
        var res = {}
        res.aaa = "123";

        return res;
    }


    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = GD;
    }else if(typeof define !== "undefined"){
        define(['Underscore','main','utils'],function(_,main,utils){
            return GD(_,main,utils);
        });
    }else{
        root.GD = GD;
    }
})(window || this);