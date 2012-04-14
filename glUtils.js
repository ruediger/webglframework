/*function mht(m) {
    var s = "";
    if (m.length == 16) {
        for (var i = 0; i < 4; i++) {
            s += "<span style='font-family: monospace'>[" + m[i*4+0].toFixed(4) + "," + m[i*4+1].toFixed(4) + "," + m[i*4+2].toFixed(4) + "," + m[i*4+3].toFixed(4) + "]</span><br>";
        }
    } else if (m.length == 9) {
        for (var i = 0; i < 3; i++) {
            s += "<span style='font-family: monospace'>[" + m[i*3+0].toFixed(4) + "," + m[i*3+1].toFixed(4) + "," + m[i*3+2].toFixed(4) + "]</font><br>";
        }
    } else {
        return m.toString();
    }
    return s;
}*/

// getShader copied from MDC
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);
  if (!shaderScript) {
    return null;
  }
  
  // Walk through the source element's children, building the shader source string.
  
  var theSource = "";
  var currentChild = shaderScript.firstChild;
  
  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }
    
    currentChild = currentChild.nextSibling;
  }
  
  // Now figure out what type of shader script we have,
  // based on its MIME type.
  
  var shader;
  
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }
  
  // Send the source to the shader object
  
  gl.shaderSource(shader, theSource);
  
  // Compile the shader program
  
  gl.compileShader(shader);
  
  // See if it compiled successfully
  
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
 }

// copied from MDN
var perspectiveMatrix;
var mvMatrix;

function loadIdentity() {
  mvMatrix = mat4.identity();
}

function multMatrix(m) {
  mat4.multiply(mvMatrix, m);
}

function mvTranslate(v) {
  mat4.translate(mvMatrix, v);
}

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, perspectiveMatrix);

  var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  gl.uniformMatrix4fv(mvUniform, false, mvMatrix);
}

var mvMatrixStack = [];

function mvPushMatrix(m) {
  if (m) {
    mvMatrix = mat4.create(m);
  }
  mvMatrixStack.push(mat4.create(mvMatrix));
}

function mvPopMatrix() {
  if (!mvMatrixStack.length) {
    throw("Can't pop from an empty matrix stack.");
  }
  
  mvMatrix = mvMatrixStack.pop();
  return mvMatrix;
}

function mvRotate(angle, v) {
  const inRadians = angle * Math.PI / 180.0;
  mat4.rotate(mvMatrix, inRadians, v);
}

function mvRotateX(angle) {
  const inRadians = angle * Math.PI / 180.0;
  mat4.rotateX(mvMatrix, inRadians);
}

function mvRotateY(angle) {
  const inRadians = angle * Math.PI / 180.0;
  mat4.rotateY(mvMatrix, inRadians);
}

function mvRotateZ(angle) {
  const inRadians = angle * Math.PI / 180.0;
  mat4.rotateZ(mvMatrix, inRadians);
}

function mvScale(scalar) {
  mat4.scale(mvMatrix, [scalar, scalar, scalar]);
}
// end
