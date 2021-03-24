import { render } from "@testing-library/react";
import Footer from "components/footer";

describe("<Footer/>", () => {
  test("shows proper footer when rendered", () => {
    const { container } = render(<Footer />);
    expect(container).toHaveTextContent('Made with love and ReactJS. Anhar © 2021.');
  });
});
