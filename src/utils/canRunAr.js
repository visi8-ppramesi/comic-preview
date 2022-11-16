import UAParser from 'ua-parser-js'
import isNil from 'lodash/isNil'
import {
    GL_ARRAY_BUFFER,
    GL_COLOR_BUFFER_BIT,
    GL_FLOAT,
    GL_FRAGMENT_SHADER,
    GL_RGBA,
    GL_STATIC_DRAW,
    GL_TRIANGLES,
    GL_UNSIGNED_BYTE,
    GL_VERTEX_SHADER,
  } from 'webgl-constants';

const os = UAParser(navigator.userAgent).os

function calculateMagicPixelId() {
    const magicPixel = localStorage.getItem('magicpixel')
    if (!isNil(magicPixel)) {
        return magicPixel
    }
    const attributes = {
        alpha: false,
        antialias: false,
        depth: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: 'high-performance',
        stencil: false,
    };

    // Workaround for Safari 12, which otherwise crashes with powerPreference set
    // to high-performance: https://github.com/pmndrs/detect-gpu/issues/5
    if (/Version\/12.+Safari/.test(navigator.userAgent)) {
        delete attributes.powerPreference;
    }

    const canvas = window.document.createElement('canvas');

    const gl = (canvas.getContext('webgl', attributes) ||
        canvas.getContext(
            'experimental-webgl',
            attributes
        ));

    const vertexShaderSource = /* glsl */ `
      precision highp float;
      attribute vec3 aPosition;
      varying float vvv;
      void main() {
        vvv = 0.31622776601683794;
        gl_Position = vec4(aPosition, 1.0);
      }
    `;

    const fragmentShaderSource = /* glsl */ `
      precision highp float;
      varying float vvv;
      void main() {
        vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;
        enc = fract(enc);
        enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);
        gl_FragColor = enc;
      }
    `;

    const vertexShader = gl.createShader(GL_VERTEX_SHADER);
    const fragmentShader = gl.createShader(GL_FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!(fragmentShader && vertexShader && program)) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    gl.useProgram(program);

    const vertexArray = gl.createBuffer();
    gl.bindBuffer(GL_ARRAY_BUFFER, vertexArray);
    gl.bufferData(
        GL_ARRAY_BUFFER,
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        GL_STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.vertexAttribPointer(aPosition, 3, GL_FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1, 1, 1, 1);
    gl.clear(GL_COLOR_BUFFER_BIT);
    gl.viewport(0, 0, 1, 1);
    gl.drawArrays(GL_TRIANGLES, 0, 3);

    const pixels = new Uint8Array(4);
    gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_UNSIGNED_BYTE, pixels);

    gl.deleteProgram(program);
    gl.deleteBuffer(vertexArray);
    const joinedPixels = pixels.join('')
    localStorage.setItem('magicpixel', joinedPixels)
    return joinedPixels;
}

let canRunAr = false
const version = parseFloat(os.version)

if (os.name.toLowerCase() === 'ios') {
    const magicPixel = calculateMagicPixelId()
    canRunAr = version >= 15 || (version >= 13 && (magicPixel === '801621810' || magicPixel === '80162181255'))
} else if (os.name.toLowerCase() === 'android') {
    canRunAr = version >= 10
}

export default canRunAr