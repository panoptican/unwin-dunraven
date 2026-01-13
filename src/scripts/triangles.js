// via Larry A. Williamson
// http://codepen.io/lawrencealan/pen/dJuao

var triforce_timeout = null;
var triforce = {
  conf: {
    unit_size:64,
    rows:300,
    cols:300,
    delay:75,
    iterations:250
  },
  init: function(){
    var ww,wh;
    ww=($('#cover-section').width());
    wh=($('#cover-section').height());

    $t = triforce;
    $t.cvs = document.createElement('canvas');
    $t.cvs.setAttribute('width',ww*2);
    $t.cvs.setAttribute('height',wh*2);

    $t.ctx = $t.cvs.getContext('2d');

    $('#cover-section').append($t.cvs);
    $t.cvs = $($t.cvs);

    $t.cvs.css({
      width: ww+"px",
      height: wh+"px"
    });

    $t.conf.rows = wh*2/$t.conf.unit_size;
    $t.conf.cols = ww*2/$t.conf.unit_size;

    $t.go();
  },
  ctx: null,
  go: function(){
    for(var c = 0; c<$t.conf.cols; c++)
      for(var r = 0; r<$t.conf.rows; r++) {
        var ux = (c*$t.conf.unit_size)+ (r%2 ? $t.conf.unit_size*.5 : 0);
        $t.unit(ux,r*$t.conf.unit_size);
        r+= -2+Math.round(4*Math.random());
        c+= -2+Math.round(4*Math.random());
      }
    if($t.conf.delay>0 && $t.conf.iterations-->0)
      setTimeout($t.go,$t.conf.delay);
  },
  unit: function(x,y) {
    var fs,this_size,this_bottom;
    fs=$t.randColor();
    if(fs) {

    this_size = $t.conf.unit_size;
    this_size = this_size * Math.ceil(Math.random()*10);
    this_top = y-this_size*.5;
    this_bottom = this_top + this_size*.85;

    $t.ctx.beginPath();
    $t.ctx.fillStyle = fs;
    $t.ctx.moveTo(x+this_size*.5, this_top);
    $t.ctx.lineTo(x+this_size, this_bottom);
    $t.ctx.lineTo(x,this_bottom);
    $t.ctx.fill();
    }
  },
  randColor: function(){
    return randomColor({hue: 'monochrome', luminosity: 'dark'});;
  }
}

$(window).on('load resize',function(){
  $('canvas').remove();
  clearTimeout(triforce_timeout);
  triforce_timeout = setTimeout(triforce.init,30);
});