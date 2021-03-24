import { render, screen, fireEvent } from "@testing-library/react";
import CardSearch from "components/card/search";
import { sliceText } from "utils/helpers";

describe("<CardSearch/>", () => {
  test('calls "onClick" props on card click', () => {
    const onClick = jest.fn();
    render(<CardSearch onClick={onClick} />);

    const card = screen.getByTestId("card-search-div");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  test("card title has sliced by 30 character", () => {
    const Title =
      "Test TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest Title";

    render(<CardSearch Title={Title} />);
    const title = screen.getByTestId("card-search-title");
    expect(title).toHaveTextContent(sliceText(Title, 30));
  });

  test("card has correct props value", () => {
    const Poster = "TestPoster.jpg";
    const Title = "Test Title";
    const Year = "Test Year";
    const Type = "Test Type";

    render(<CardSearch Poster={Poster} Title={Title} Year={Year} Type={Type} />);
    const image = screen.getByAltText(Title);
    const year = screen.getByTestId("card-search-year");
    const type = screen.getByTestId("card-search-type");

    expect(image.src).toContain(Poster);
    expect(year).toHaveTextContent(Year);
    expect(type).toHaveTextContent(Type);
  });
});
