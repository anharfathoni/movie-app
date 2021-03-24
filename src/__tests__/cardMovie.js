import { render, screen, fireEvent } from "@testing-library/react";
import CardMovie from "components/card/movie";
import { sliceText } from "utils/helpers";

describe("<CardMovie/>", () => {
  test('calls "onClickImage" props on card click', () => {
    const onClick = jest.fn();
    render(<CardMovie onClickImage={onClick} />);

    const card = screen.getByTestId("btn-click-image");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  test('calls "onClickDetail" props on card click', () => {
    const onClick = jest.fn();
    render(<CardMovie onClickDetail={onClick} />);

    const card = screen.getByTestId("btn-click-detail");
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  test("card has correct props value", () => {
    const Poster = "TestPoster.jpg";
    const Title = "Test Title";
    const Year = "Test Year";
    const Type = "Test Type";

    render(<CardMovie Poster={Poster} Title={Title} Year={Year} Type={Type} />);
    const image = screen.getByAltText(Title);
    const year = screen.getByTestId("card-movie-year");
    const type = screen.getByTestId("card-movie-type");

    expect(image.src).toContain(Poster);
    expect(year).toHaveTextContent(Year);
    expect(type).toHaveTextContent(Type);
  });

  test("card title has sliced by 20 character", () => {
    const Title =
      "Test TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest TitleTest Title";

    render(<CardMovie Title={Title} />);
    const title = screen.getByTestId("btn-click-detail");
    expect(title).toHaveTextContent(sliceText(Title, 20));
  });
});
