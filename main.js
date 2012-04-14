const xhtmluri = "http://www.w3.org/1999/xhtml";
var vertexPositionAttribute;
var vertexColorAttribute;
var shaderProgram;
var width;
var height;
var gl = null;

function createArrayBuffer(data) {
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buf;
}

function createElementArrayBuffer(data) {
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
  return buf;
}

function draw(timestamp) {
  var time = timestamp || Date.now();
  var delta = time - animation_start_time; // see comp.js

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  perspectiveMatrix = mat4.perspective(45, width/height, 0.1, 100.0);
  loadIdentity();

  // ...

  animation_start_time = time;
  requestAnimFrame(draw);
}

function start() {
  var canvas = document.getElementById("glcanvas");
  
  width = parseInt(canvas.attributes["width"].value);
  height = parseInt(canvas.attributes["height"].value);

  try {
    gl = canvas.getContext("experimental-webgl");
  }
  catch(e) {
  }
  
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }
  else {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
    gl.clearDepth(1.0);                                     // Clear everything
    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.

    // Load shaders
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }
    
    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(vertexColorAttribute);

    // Load elements
    // ...

    // Set up event Handlers    
    // document.addEventListener('keydown', keydown, true);
    // document.addEventListener('keyup', keyup, true);
    // ...

    // Start drawing
    requestAnimFrame(draw);
  }
}
