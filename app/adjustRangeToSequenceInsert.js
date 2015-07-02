// var areNonNegativeIntegers = require('validate.io-nonnegative-integer-array');
var splitRangeIntoTwoPartsIfItIsCircular = require('./splitRangeIntoTwoPartsIfItIsCircular');

//note: anotherRange is assumed to be non-circular! (this makes sense because we're never inserting a circular range...)
module.exports = function adjustRangeToSequenceInsert(rangeToBeAdjusted, insertStart, insertLength) {
  var newRange = {
    start: rangeToBeAdjusted.start,
    end:rangeToBeAdjusted.end
  }
  if (rangeToBeAdjusted.start > rangeToBeAdjusted.end) { 
    //circular range
    if (rangeToBeAdjusted.end >= insertStart) {
      //adjust both start and end
      newRange.start+=insertLength;
      newRange.end+=insertLength;
    } else if (rangeToBeAdjusted.start >= insertStart) {
      //adjust just the start
      newRange.start+=insertLength;
    } 
  } else {
    if (rangeToBeAdjusted.start >= insertStart) {
      //adjust both start and end
      newRange.start+=insertLength;
      newRange.end+=insertLength;
    } else if (rangeToBeAdjusted.end >= insertStart) {
      //adjust just the end
      newRange.end+=insertLength;
    } 
  }
  return newRange;
  //we can make some awesome logical simplifications because we know that the two ranges do not overlap (since we've already trimmed the rangeToBeAdjusted)
};