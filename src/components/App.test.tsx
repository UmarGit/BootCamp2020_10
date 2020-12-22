import React from "react"
import { shallow } from "enzyme"
import App from "./App"
import Timer from "./Timer/Timer"

describe("App", () => {
  let container = shallow(<App />);

  beforeEach(() => (container = shallow(<App />)))
  
  it("should render the Timer Component", () => {
    container.find("#app-main-button").simulate('click');
    expect(container.containsMatchingElement(<Timer start={true}/>)).toEqual(true)
  })
})