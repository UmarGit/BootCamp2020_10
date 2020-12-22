import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import Timer from "./Timer"


describe("Timer", () => {
  let container: ShallowWrapper;
  
  beforeEach(() => (container = shallow(<Timer start={true}/>)))

  it("should render a <div />", () => {
    expect(container.find("#timer-container").length).toBeGreaterThanOrEqual(1)
  })

  it("should render instances of the TimerButton component", () => {
    expect(container.find("TimerButton").length).toEqual(1)
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    expect(container.find("TimerButton").length).toEqual(2)
  })

  it('invokes startTimer when the start button is clicked', async () => {
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("true");
  });

  it('invokes stopTimer when the stop button is clicked', () => {
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    container.find("TimerButton[buttonValue='Stop']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
  });

  it('invokes resetTimer when the reset button is clicked', () => {
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    container.find("TimerButton[buttonValue='Reset']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
  });

  it('should change isOn state true when the start button is clicked', () => {
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("true");
  });

  it('should change isOn state false when the stop button is clicked', () => {
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    container.find("TimerButton[buttonValue='Stop']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
  });

  it('should change isOn,hour,minutes,seconds state when the reset button is clicked', () => {
    container.find("TimerButton[buttonValue='Start']").dive().simulate('click');
    container.find("TimerButton[buttonValue='Reset']").dive().simulate('click');
    expect((container.find('input[name="timer-status"]').get(0).props.value)).toBe("false");
    expect((container.find('input[name="timer-minutes"]').get(0).props.value)).toBe("60");
    expect((container.find('input[name="timer-minutes"]').get(0).props.value)).toBe("60");
    expect((container.find('input[name="timer-seconds"]').get(0).props.value)).toBe("60");
 });
})