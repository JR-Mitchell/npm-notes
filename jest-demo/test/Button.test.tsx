import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/Button';


test("Button snapshot", () => {
    jest.useFakeTimers();
    const button = renderer.create(<Button />);
    let tree = button.toJSON();
    expect(tree).toMatchSnapshot("initial");
    //Click the button
    tree.children[0].props.onClick();
    do {
        //Re-render the tree
        tree = button.toJSON();
        //Match new snapshot
        expect(tree).toMatchSnapshot("afterClick");
        //Run only currently set timers
        jest.runOnlyPendingTimers();
    } while(jest.getTimerCount() != 0);
})
