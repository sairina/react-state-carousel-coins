import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function () {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // starts us at image 2
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides arrows at the ends ", function () {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // expect the left arrow to be hidden at the beginning
  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).toHaveClass("hidden");

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  
  // expect the right arrow to be hidden at the end
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
