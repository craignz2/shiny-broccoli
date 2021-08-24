var parent = document.getElementById("gradients");
//var parent2 = document.getElementById("gradients2");

var colors = new Array(
    [255, 234, 48],
    [255, 253, 237],
    [255, 176, 79],
    [66, 255, 198],
    [235, 23, 126],
    [117, 207, 255]
);

var step = 0;
var colorIndices = [0,1,2,3];

var gradientSpeed = 0.001;

parent.width = screen.width;
parent.height = screen.height;
//parent2.width = screen.width;
//parent2.height = screen.height;

function updateGradient(){    
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1_1 = "rgba("+r1+","+g1+","+b1+",0.5)";
    //var color1_2 = "rgba("+r1+","+g1+","+b1+",0.5)";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2_1 = "rgba("+r2+","+g2+","+b2+",0.5)";
    //var color2_2 = "rgba("+r2+","+g2+","+b2+",0.5)";
    
    //parent.setAttribute("style", "background: -webkit-gradient(linear, left top, right top, from("+color1_1+"), to("+color2_1+")); background: -webkit-gradient(linear, left top, right top, from("+color1_1+"), to("+color2_1+")); ");
    //parent2.setAttribute("style", "background: -webkit-gradient(linear, left top, left bottom, from("+color1_2+"), to("+color2_2+")); background: -webkit-gradient(linear, left top, left bottom, from("+color1_2+"), to("+color2_2+")); ");

    step += gradientSpeed;
    if (step >= 1){
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }

    var ctx = parent.getContext("2d");
    //var ctx2 = parent2.getContext("2d");

    ctx.clearRect(0, 0, screen.width, screen.height);
    //ctx2.clearRect(0, 0, screen.width, screen.height);

    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, screen.width, 0);
    grd.addColorStop(0, color1_1);
    grd.addColorStop(1, color2_1);

    var grd2 = ctx.createLinearGradient(0, 0, 0, screen.height);
    grd2.addColorStop(0, color1_1);
    grd2.addColorStop(1, color2_1);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, screen.width, screen.height);

    ctx.fillStyle = grd2;
    ctx.fillRect(0, 0, screen.width, screen.height);
}

//setInterval(updateGradient,10);
