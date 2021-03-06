(function(){
    /**
     * 基
     */
    
    function Graphics(ctx){
        this.ctx = ctx;
        
        this.push = function(){
            this.ctx.save();
            return this;
        }
        
        this.pop = function(){
            this.ctx.restore();
            return this;
        }
        
        this.save = function(){
            this.ctx.save();
            return this;
        }
        
        this.restore = function(){
            this.ctx.restore();
            return this;
        }
        
        this.moveTo = function(x,y){
            this.ctx.moveTo(x,y);
            return this;
        }
        this.lineTo = function(x,y){
            this.ctx.lineTo(x,y);
            return this;
        }
        
        this.circle = function(x,y,r){
            this.ctx.arc(x,y,r,0,2*Math.PI,false);
            return this;
        }
        
        this.beginPath = function(){
            this.ctx.beginPath();
            return this;
        }
        
        this.closePath = function(){
            this.ctx.closePath();
            return this;
        }
        this.translate =function(x,y){
            this.ctx.translate(x,y);
            return this;
        }
        this.blendMode = function(blendMode){
            if(blendMode){
                this.ctx.globalCompositeOperation = blendMode;
                return this;
            }else{
                return this.ctx.globalCompositeOperation;
            }
        };
        
        this.lineCap = function(str){
            if(str){
                this.ctx.lineCap = str;
                return this;
            }else{
                return this.ctx.lineCap;
            }
            
        }
        
        this.fillStyle = function(color){
            if(color){
                this.ctx.fillStyle = color;
                return this;
            }else{
                return this.ctx.fillStyle;
            }
        }
        this.strokeStyle = function(color){
            if(color){
                this.ctx.strokeStyle = color;
                return this;
            }else{
                return this.ctx.strokeStyle;
            }
        }
        this.opacity = function(color){
            if(color){
                this.ctx.globalAlpha = color;
                return this;
            }else{
                return this.ctx.globalAlpha;
            }
        }
        
        
        
        this.arcTo = function(x1,y1,x2,y2,r){
            this.ctx.arcTo(x1,y1,x2,y2,r);
            return this;
        }
        
        this.quadraticCurveTo = function(cpx,cpy,x,y){
            this.ctx.quadraticCurveTo(cpx,cpy,x,y);
            return this;
        }
        
        this.bezierCurveTo = function(cp1x,cp1y,cp2x,cp2y,x,y){
            this.ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
            return this;
        }
        
        this.rect = function(x,y,w,h){
            this.ctx.rect(x,y,w,h);
            return this;
        }
        
        this.clearRect = function(x,y,w,h){
            this.ctx.clearRect(x,y,w,h);
            return this;
        }
        
        this.stroke = function(){
            this.ctx.stroke();
            return this;
        }
        
        this.fill = function(){
            this.ctx.fill();
            return this;
        }
        /**
         * 多边形
         * @throws {TypeError} [[Description]]
         * @param   {[[Type]]} ps [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        this.polygon = function(ps){
            if(Object.prototype.toString.call(ps)!="[object Array]"){
                throw new TypeError();
            }
            var i=0,len=ps.length-1,_ctx = this.ctx;
            _ctx.moveTo(ps[0],ps[1]);
            for(i=2;i<len;i++){
                _ctx.lineTo(ps[i],ps[i+1]);
            }
            return this;
        }
        /**
         * 向当前path中添加正多边形subpath
         * @param {Number} cx 多边形重心
         * @param {Number} cy 多边形重心
         * @param {int}    ec 多边形的边数，不能小于3
         * @param {Number} r1 半径1
         * @param {Number} r2 半径2
         * @return this
         */
        this.regularPolygon = function(cx,cy,ec,r1,r2){
            cx = cx||0;
            cy = cy||0;
            ec = ec<3?3:ec;
            var M = TDSC.Math;
            var vtx = [];
            var step = 360/ec;
            for(var i=0,j=0;i<360;i+=step,j++){
                var tr = r1;
                if(r2){
                    if(j%2!==0)tr=r1;
                    else{tr=r2};
                }

                if(!M.COSTABLE[i]){
                    vtx.push(cx+tr*M.COSTABLE[Math.round(i)],cy+tr*M.SINTABLE[Math.round(i)]);
                }else{
                    vtx.push(cx+tr*M.COSTABLE[i],cy+tr*M.SINTABLE[i]);
                }
            }
            console.log(vtx)
            this.polygon(vtx);
            return this;
        };
        /**
         * 椭圆形
         * @param   {[[Type]]} x [[Description]]
         * @param   {[[Type]]} y [[Description]]
         * @param   {[[Type]]} w [[Description]]
         * @param   {[[Type]]} h [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        this.ellipse = function(x,y,w,h){
            var kappa = 0.5522848;
            var ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w,           // x-end
                ye = y + h,           // y-end
                xm = x + w / 2,       // x-middle
                ym = y + h / 2;       // y-middle
            var c = this.ctx;
            //c.rect(x,y,w,h)
            c.moveTo(x, ym);
            //c.lineTo(x, ym - oy)
            //c.arc(x,ym,10,0,2*Math.PI,false);
            
            c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            return this;
        };
        /**
         * 圆角矩形
         * @param   {[[Type]]} x [[Description]]
         * @param   {[[Type]]} y [[Description]]
         * @param   {[[Type]]} w [[Description]]
         * @param   {object}   h [[Description]]
         * @param   {[[Type]]} r [[Description]]
         * @returns {[[Type]]} [[Description]]
         */
        this.roundRect = function(x,y,w,h,r){
            var c = this.ctx;
            c.moveTo(x+r,y);
            c.lineTo(x+w-r,y);
            c.arc(x+w-r,y+r,r,Math.PI*3/2,0);
            c.lineTo(x+w,y+h-r);
            c.arc(x+w-r,y+h-r,r,Math.PI*2,Math.PI*1/2);
            c.lineTo(x+r,y+h);
            c.arc(x+r,y+h-r,r,Math.PI*1/2,Math.PI);
            c.lineTo(x,y+r);
            c.arc(x+r,y+r,r,Math.PI,Math.PI*3/2);
            return this;
        }
        
        this.arc =function(x,y,r,sr,er){
            this.ctx.arc(x,y,r,sr || 0,er||Math.PI*2);
            return this;
        }
        /**
         * [[Description]]
         * @param {string} sl   虚线每段的长度
         * @param {string} el   间隔
         * @param {string} sx   开始位置
         * @param {string} sy   结束位置
         * @param {string} type v 竖  h  横
         * @param {string} long 长度
         */
        this.dattsh = function(sl,el,sx,sy,type,long,color){
            long = long || 200;
            switch(type){
                case "v":
                    var suml = sl + el;
                    var len = Math.ceil(long/suml);
                    this.save();
                    this.strokeStyle(color);
                    this.ctx.moveTo(sx,sy);
                    for(var i=1 ; i <= len ; i++){
                        this.ctx.lineTo(sx,sy+sl*i+el*(i-1));
                        this.ctx.moveTo(sx,sy+sl*i+el*i);
                    }
                    this.stroke();
                    this.restore();
                    break;
                case "h":
                    var suml = sl + el;
                    var len = Math.ceil(long/suml);
                    this.save();
                    this.strokeStyle(color);
                    this.ctx.moveTo(sx,sy);
                    for(var i=1 ; i <= len ; i++){
                        this.ctx.lineTo(sx+sl*i+el*(i-1),sy);
                        this.ctx.moveTo(sx+sl*i+el*i,sy);
                    }
                    this.stroke();
                    this.restore();
                    break;
            }
        }
        /**
         * [[Description]]
         * @param {[[Type]]} sx   [[Description]]
         * @param {[[Type]]} sy   [[Description]]
         * @param {number} vl   竖向的间隔
         * @param {number} hl   横向的间隔
         * @param {[[Type]]} long [[Description]]
         */
        this.grid = function(sx,sy,vl,hl,vlong,hlong,color){
            var da = new Date();
            vlong = vlong || 200;
            hlong = hlong || 200;
            var sumv = vl+1,sumH = hl+1;
            var lenv = Math.ceil(vlong/sumv), lenh = Math.ceil(hlong/sumH);
            this.push();
            this.strokeStyle(color);
            this.beginPath();
            for(var i=0; i<=lenv;i++){
                this.ctx.moveTo(sx+i*vl,sy);
                this.ctx.lineTo(sx+i*vl,sy+vlong);
            }
            for(var i=0; i<=lenh;i++){
                this.ctx.moveTo(sx,sy+i*hl);
                this.ctx.lineTo(sx+hlong,sy+i*hl);
            }
            this.closePath();
            this.stroke();
            this.pop();
            console.log(new Date()*1-da*1);
        }
        
        this.CoordinateAxes = function(opts){
            opts = opts || {
                sx:100,
                sy:100,
                long:300,
                xo:"a",
                yo:"m"
                
            }
        }
       
    }
    
    
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Graphics;
    }else if(typeof define !== "undefined"){
        define(function(){return Graphics});
    }else{
        window.Graphics = Graphics;
    }
})();