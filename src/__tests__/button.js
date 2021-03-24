import { render, fireEvent } from "@testing-library/react";
import Button from "components/button";

describe("<Button/>", () => {
  test("get same button text with props", () => {
    const text = "Test Click";
    const { container } = render(<Button text={text} />);
    const button = container.querySelector("button");
    expect(button).toHaveTextContent(text);
  });

  test('calls "onClick" props on button click', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick} />);
    const button = container.querySelector("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('can not calls "onClick" props when button is disabled', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick} disabled={true} />);
    const button = container.querySelector("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('can not calls "onClick" props when button is loading', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick} loading={true} />);
    const button = container.querySelector("button");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
