requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        underscore:"Underscore",
        core:"../src/core",
        utils:"../src/utils",
        GD:"../src/GD"
    }
});
/*
requirejs(['underscore','core','utils'],
    function   (_,core,utils) {
        //jQuery, canvas and the app/sub module are all
        //loaded and can be used here now.
        console.log(core)
        console.log(utils)
        _.map([1,3,4],function(a,b){
            console.log(a,b)
        })
    });*/
requirejs(['GD'],
    function   (gd) {
        console.log(gd)
    });