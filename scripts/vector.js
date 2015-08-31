function Vector(x,y) {
    
    var _x=x;
    var _y=y;
    
    var Length = function() {
        var l = Math.sqrt(Math.pow(_x,2.0)+Math.pow(_y,2.0));
        return l;
    }
    
    var UnitVector = function() {
        var uniX = _x/Length();
        var uniY = _y/Length();
        
        return new Vector(uniX,uniY);
    }
    
    var Mult = function(a) {
        return new Vector(_x*a,_y*a);
    }
    
    var Add = function(v) {
        return new Vector(v.X+_x,v.Y+_y);
    }
    var DotProd = function(v){
        return _x*v.X + _y*v.Y;
    }
    
    var FindProjectionOn = function(v) {
        var l = this.DotProd(v.UnitVector());
        return v.UnitVector().Mult(l);
    }
    
    var FindPerpendicularTo = function(v) {
        var vProj = this.FindProjectionOn(v);
        var rev = vProj.Mult(-1.0);
        var res = rev.Add(this);
        return res;
    }
    
    return {X:_x,Y:_y,Length:Length,UnitVector:UnitVector, Mult:Mult,
            Add:Add, DotProd:DotProd, FindProjectionOn:FindProjectionOn,
            FindPerpendicularTo:FindPerpendicularTo
    };
    
}
