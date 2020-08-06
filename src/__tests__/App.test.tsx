import React from "react"
import renderer from "react-test-renderer"
import { render, screen } from "@testing-library/react"
import serializer from "jest-emotion"
import App from "../App"

expect.addSnapshotSerializer(serializer)

test("renders learn react link", () => {
  const component = render(<App />)
  const test = component.getByText("test")
  expect(screen.getByText("test")).toBe(test)
})

test("renderer link", () => {
  const component = renderer.create(<App />).toJSON()
  expect(
    component.children.filter((item : any) => item.type === "button").length === 1
  )
  expect(component).toMatchSnapshot()
})
