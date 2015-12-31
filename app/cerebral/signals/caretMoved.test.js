var controller = require('../controller')({
    //instantiate some default val's here:
    state: {
        selectionLayer: {
            selected: false,
        },
        caretPosition: 1,
        sequenceData: {
            sequence: 'atat',
            circular: true
        },
        bpsPerRow: 2 //override the usual calc here
            //seq looks like:
            //at
            //at
    }
});

var testSignal = require('../testSignal');
var caretMoved = controller.signals.caretMoved;

describe('caretMoved circular sequence', function() {
    beforeEach(function() {
        controller.reset();
        controller.tree.set(['sequenceData', 'circular'], true);
    })
    it('moveCaretLeftOne should move the cursor left 1', function() {
        controller.tree.set('caretPosition', 1);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretLeftOne',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(0);
        })
    });
    it('calling moveCaretLeftOne twice should move the cursor left 2 positions and around the sequence', function() {
        controller.tree.set('caretPosition', 1);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretLeftOne',
            shiftHeld: false,
        }).then(function() {
            return testSignal(controller, caretMoved, {
                type: 'moveCaretLeftOne',
                shiftHeld: false,
            }, function() {
                controller.get('caretPosition').should.equal(3);
            })
        })
    });

    it('moveCaretRightOne should move the cursor right 1', function() {
        controller.tree.set('caretPosition', 1);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretRightOne',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(2);
        })
    });
    it('moveCaretRightOne should move the cursor right 1 and around the sequence', function() {
        controller.tree.set('caretPosition', 4);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretRightOne',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(1);
        })
    });
    it('moveCaretUpARow should move the cursor up 2 places', function() {
        controller.tree.set('caretPosition', 4);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretUpARow',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(2);
        })
    });
    it('moveCaretUpARow should move the cursor up 2 places and around the sequence', function() {
        controller.tree.set('caretPosition', 0);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretUpARow',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(2);
        })
    });
});

describe('caretMoved non circular sequence', function() {
    beforeEach(function() {
        controller.tree.set(['sequenceData', 'circular'], false);
    })
    it('moveCaretLeftOne should not move the cursor around the sequence', function() {
        controller.tree.set('caretPosition', 0);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretLeftOne',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(0);
        })
    });

    it('moveCaretRightOne should not move the cursor around the sequence', function() {
        controller.tree.set('caretPosition', 4);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretRightOne',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(4);
        })
    });

    it('moveCaretUpARow should move the cursor up 2 places and around the sequence', function() {
        controller.tree.set('caretPosition', 0);
        return testSignal(controller, caretMoved, {
            type: 'moveCaretUpARow',
            shiftHeld: false,
        }, function() {
            controller.get('caretPosition').should.equal(0);
        })
    });
});