"use strict";
// the .js file with my code for lesson 2
//

var endTime = function (time, expr) {
    switch (expr.tag) {
        case 'note':
        return expr.dur + time;
        case 'seq':
        return endTime(endTime(time, expr.left), expr.right);
        case 'par':
        return Math.max(endTime(time, expr.left), endTime(time, expr.right));
        default:
        return 0;
    }
};

var compile = function (musexpr, startTime) {
    if (!startTime) startTime = 0;
    var end = 0;
    var notes = [];
    switch (musexpr.tag) {
        case 'note':
        return [{
            tag: 'note',
            pitch: musexpr.pitch,
            start: startTime,
            dur: musexpr.dur
        }];

        case 'seq':
        end = endTime(startTime, musexpr.left);
        notes = compile(musexpr.left, startTime);
        notes = notes.concat(compile(musexpr.right, end));
        return notes;
        case 'par':
        notes = compile(musexpr.left, startTime);
        notes = notes.concat(compile(musexpr.right, startTime));
        return notes;
        default:
        return [];
    }
};
