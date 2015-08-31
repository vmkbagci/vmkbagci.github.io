function Container(xTL, yTL, xRB, yRB) {

    var _xtl = xTL;
    var _ytl = yTL;
    var _xrb = xRB;
    var _yrb = yRB;
    var _balls = [];
    
    var AddBall = function(b) {
        this.Balls.push(b);
    }
    
    var BounceFromWalls = function() {
        _balls.forEach(function(item,index){
                                var debugNumm = item.BallNum;
                                //console.log(item.Name+", Pos: ("+item.X+", "+item.Y+"), Vel: ("+item.Vel.X+", "+item.Vel.Y+")");
                                var newVx = item.Vel.X;
                                var newVy = item.Vel.Y;
            
                                if(item.X < _xtl+10) {
                                    newVx = Math.max(-1 * item.Vel.X,item.Vel.X);
                                }
                                   
                                if(item.X > _xrb-10) {
                                    newVx = Math.min(-1 * item.Vel.X,item.Vel.X);
                                }
            
                                if(item.Y < _ytl+10) {
                                    newVy = Math.max(-1 * item.Vel.Y,item.Vel.Y);
                                }
                                
                                if(item.Y > _yrb-10) {
                                    newVy = Math.min(-1 * item.Vel.Y,item.Vel.Y);
                                }
            
                                item.SetVel(new Vector(newVx,newVy));
                            }
                       )
    }
    
    var BounceFromOtherBalls = function(){
        var iMax = _balls.length;
        for (var i = 0;i<iMax;i++){
            for (var j=i+1;j<iMax;j++){
                _balls[i].CollideWith(_balls[j]);
            }
        }
    }
    
    var MagneticInteraction = function() {
        var iMax = _balls.length;
        for (var i = 0;i<iMax;i++){
            for (var j=i+1;j<iMax;j++){
                _balls[i].MagneticInteraction(_balls[j]);
            }
        }
    }
    
    return {Balls: _balls, AddBall: AddBall, BounceFromWalls: BounceFromWalls, 
                    BounceFromOtherBalls:BounceFromOtherBalls, MagneticInteraction:MagneticInteraction};
}