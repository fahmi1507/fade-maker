'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FADEOUT = exports.FADEIN = exports.LOGARITHMIC = exports.EXPONENTIAL = exports.LINEAR = exports.SCURVE = undefined;
exports.createFadeIn = createFadeIn;
exports.createFadeOut = createFadeOut;

var _fadeCurves = require('fade-curves');

var SCURVE = exports.SCURVE = "sCurve";
var LINEAR = exports.LINEAR = "linear";
var EXPONENTIAL = exports.EXPONENTIAL = "exponential";
var LOGARITHMIC = exports.LOGARITHMIC = "logarithmic";

var FADEIN = exports.FADEIN = "FadeIn";
var FADEOUT = exports.FADEOUT = "FadeOut";

function sCurveFadeIn(start, duration) {
    var curve = (0, _fadeCurves.sCurve)(10000, 1);
    this.setValueCurveAtTime(curve, start, duration);
}

function sCurveFadeOut(start, duration) {
    var curve = (0, _fadeCurves.sCurve)(10000, -1);
    this.setValueCurveAtTime(curve, start, duration);
}

function linearFadeIn(start, duration, drawStart = 0, drawEnd = 1) {
    console.log('======', drawStart, drawEnd, '< start end fad emaker')
    this.setValueAtTime(drawStart, start);
    this.linearRampToValueAtTime(drawEnd, start + duration);

    this.linearRampToValueAtTime(1, start + duration);
}

function linearFadeOut(start, duration, drawStart = 1, drawEnd = 0) {
    console.log('======', drawStart, drawEnd, '< start end fade out');
    this.setValueAtTime(drawStart, start);
    this.linearRampToValueAtTime(drawEnd, start + duration);

    this.linearRampToValueAtTime(1, start + duration);
}

function exponentialFadeIn(start, duration) {
    console.log('EXO')
    this.setValueAtTime(0.01, start); // Ensure gain starts at 0.01 (not 0)
    this.exponentialRampToValueAtTime(1, start + duration); // Smooth exponential fade-in
}


function exponentialFadeOut(start, duration) {
    this.exponentialRampToValueAtTime(1, start);
    this.exponentialRampToValueAtTime(0.01, start + duration);
}

function logarithmicFadeIn(start, duration) {
    var curve = (0, _fadeCurves.logarithmic)(10000, 10, 1);
    this.setValueCurveAtTime(curve, start, duration);
}

function logarithmicFadeOut(start, duration) {
    var curve = (0, _fadeCurves.logarithmic)(10000, 10, -1);
    this.setValueCurveAtTime(curve, start, duration);
}

function createFadeIn(gain, shape, start, duration, drawStart, drawEnd) {
    switch (shape) {
        case SCURVE:
            sCurveFadeIn.call(gain, start, duration);
            break;
        case LINEAR:
            linearFadeIn.call(gain, start, duration, drawStart, drawEnd);
            break;
        case EXPONENTIAL:
            exponentialFadeIn.call(gain, start, duration);
            break;
        case LOGARITHMIC:
            logarithmicFadeIn.call(gain, start, duration);
            break;
        default:
            throw new Error("Unsupported Fade type");
    }
}

function createFadeOut(gain, shape, start, duration, drawStart, drawEnd) {
    switch (shape) {
        case SCURVE:
            sCurveFadeOut.call(gain, start, duration);
            break;
        case LINEAR:
            linearFadeOut.call(gain, start, duration, drawStart, drawEnd);
            break;
        case EXPONENTIAL:
            exponentialFadeOut.call(gain, start, duration);
            break;
        case LOGARITHMIC:
            logarithmicFadeOut.call(gain, start, duration);
            break;
        default:
            throw new Error("Unsupported Fade type");
    }
}
