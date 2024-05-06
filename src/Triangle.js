class Triangle {
    constructor() {
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
      this.size = 5.0;
      this.buffer = null;
    }
  
    render() {
      var rgba = this.color;
      var size = this.size;
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniform1f(u_Size, size);     
      var d = this.size / 200.0;                                    
      drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d]); 
    }
}

// Basic draw triangle
function drawTriangle(vertices) {
    var n = 3;
    
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }   
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
  
var g_vertexBuffer = null;

function initTriangle3D() {
    g_vertexBuffer = gl.createBuffer();
    if (!g_vertexBuffer) {
        console.log('Failed to create the buffer object');
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
    
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}

function drawTriangle3D(vertices) {
    var n = vertices.length / 3;
    if (g_vertexBuffer == null) {
        initTriangle3D();
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
  
function drawTriangle3DUV(vertices, uv) {
    var n = vertices.length / 3; 
  
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    // Create a buffer object for UV
    var uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_UV);

    // Draw triangle!
    gl.drawArrays(gl.TRIANGLES, 0, n);
    vertexBuffer = null;
}  