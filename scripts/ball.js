function Ball(x,y,num,vel){
    
    var _x=x;
    var _y=y;
    var _vel = vel;
    var _ballNum = num;
    var _trail=[];
    var _flying = false;
    var _flightTime = 100;
    var _mass=1;
    
    var Propagate = function(dt) {
        var debugNum = _ballNum;
        _x = _x + _vel.X * dt;
        _y = _y + _vel.Y * dt;
        if(_trail.length > 99) {
            _trail.shift();
        }
        _trail.push({X:_x,Y:_y});
        if(_flying) {
            _flightTime--;
            if(_flightTime<1){
                _flightTime = 100;
                this.SetFlying(false);
            }
        }
        this.X = _x;
        this.Y = _y;
        if(this.BallNum == 0) {
            score += Math.abs(this.Vel.Length()) * 0.01;
        }
    }

    var CollideWith = function(b) {
        var dx = _x - b.X;
        var dy = _y - b.Y;
        
        var d = new Vector(dx,dy);
        var p = new Vector(dy,-dx);
        
        if(d.Length() < (10.0 * Math.sqrt(2.0))) // Assuming this is the collision radius
        {
            if(! (_flying || b.Flying))
            {
                var relV = _vel.Add(b.Vel.Mult(-1));
                if(relV.DotProd(d)<0) { // They are approaching one another

                    var vPrll = _vel.FindProjectionOn(p);
                    var vPerp = _vel.FindPerpendicularTo(p);
                    var vbPrll = b.Vel.FindProjectionOn(p);
                    var vbPerp = b.Vel.FindPerpendicularTo(p);
                    
                    var vp = (vPerp.Mult(this.Mass-b.Mass).Add(vbPerp.Mult(2.0*b.Mass))).Mult(1/(this.Mass+b.Mass));
                    var vbp = (vbPerp.Mult(b.Mass-this.Mass).Add(vPerp.Mult(2.0*this.Mass))).Mult(1/(this.Mass+b.Mass));
                    var vprime = vPrll.Add(vp);
                    var vbprime = vbPrll.Add(vbp);

                    this.SetVel(vprime);
                    b.SetVel(vbprime);
                    
//                    if(this.BallNum != 0) {
//                        this.SetFlying(true);
//                    }
//                    if(b.BallNum != 0){
//                        b.SetFlying(true);
//                    }
                    
                    if(b.BallNum == 0 || this.BallNum == 0) {
                        if(b.BallNum == successNum || this.BallNum == successNum) {
                            successNum++;
                            score += numBalls*20;
                            timeLeft += 10;
                            timeToAddBall=true;
                        } else {
                            //livesLeft--;
                        }
                    }
                }
            }
        }
        
    }
    
    var MagneticInteraction = function(b) {
        var dx = _x - b.X;
        var dy = _y - b.Y;
        
        var d = new Vector(dx,dy);
        
        var mag = Math.min(0.70,75.0 / Math.pow(d.Length(),2.0));
        var force = d.UnitVector().Mult(mag);
        this.SetVel(_vel.Add(force.Mult(-1)));
        b.SetVel(b.Vel.Add(force));
    }
    
    var SetVel = function(vel){
        _vel=vel;
        this.Vel = _vel;
    }
    
    var SetFlying = function(ff){
        _flying = ff;
        this.Flying = _flying;
    }
    
    return { X: _x, Y: _y, Vel: _vel, Flying: _flying, BallNum: _ballNum, Mass: _mass, Trail:_trail, Propagate:Propagate, CollideWith:CollideWith, 
            MagneticInteraction:MagneticInteraction, SetVel:SetVel, SetFlying:SetFlying};
}