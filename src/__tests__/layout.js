import { render, screen } from "@testing-library/react";
import Layout from "components/layout";
import { Provider } from "react-redux";
import store from "stores/configureStore";

describe("<Layout/>", () => {
  test("Layout content has the same value with props children", () => {
    const text = "Test Layout";
    const content = <div data-testid='layout-div'>{text}</div>;
    render(
      <Provider store={store}>
        <Layout>{content}</Layout>
      </Provider>
    );
    const element = screen.getByTestId("layout-div");
    expect(element).toHaveTextContent(text);
  });
});
