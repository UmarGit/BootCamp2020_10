import React from "react"
import { shallow, ShallowWrapper } from "enzyme"
import TimerButton from "./TimerButton"

describe("TimerButton", () => {
  let container: ShallowWrapper;

  it("should render a start button", () => {
    container = shallow(
      <TimerButton
        buttonAction={jest.fn()}
        buttonValue={"Start"}
      />
    )
    expect(container.find("#Start").length).toBeGreaterThanOrEqual(1)
  })

  it("should render a stop button", () => {
    container = shallow(
      <TimerButton
        buttonAction={jest.fn()}
        buttonValue={"Stop"}
      />
    )
    expect(container.find("#Stop").length).toBeGreaterThanOrEqual(1)
  })

  it("should render a reset button", () => {
    container = shallow(
      <TimerButton
        buttonAction={jest.fn()}
        buttonValue={"Reset"}
      />
    )
    expect(container.find("#Reset").length).toBeGreaterThanOrEqual(1)
  })

})