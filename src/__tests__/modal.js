import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "components/modal";

describe("<Modal/>", () => {
  test("modal has className 'modal' when it is open", () => {
    const { container } = render(<Modal open={true} />);
    const div = container.querySelector("#simpleModal");
    expect(div).toHaveClass("modal");
  });

  test("modal has className 'displayNone' when it is closed", () => {
    const { container } = render(<Modal open={false} />);
    const div = container.querySelector("#simpleModal");
    expect(div).toHaveClass("displayNone");
  });

  test('calls "onClose" props on modal click', () => {
    const onClick = jest.fn();
    render(<Modal onClose={onClick} />);

    const modal = screen.getByTestId("btn-close-modal");
    fireEvent.click(modal);
    expect(onClick).toHaveBeenCalled();
  });
});
