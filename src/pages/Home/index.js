import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import get from "lodash/get";

import services from "services/movies";
import { publicRoutes } from "constants/routes";
import Modal from "components/modal";
import MovieCard from "components/card/movie";
import Button from "components/button";

const ACTIONS = {
  GET: "GET",
  LOAD_MORE: "LOAD_MORE",
};

const TITLE = "Detective Conan";

function Home() {
  const history = useHistory();
  const loader = useRef(null);
  const querySearch = useQueryParam("s", StringParam)[0];

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    modalImage: "",
    modalDesc: "",
  });

  const onClickImage = (image, desc) => () => {
    setModalContent({
      modalImage: image,
      modalDesc: desc,
    });
    setOpenModal(true);
  };

  const onClickDetail = (imdbID) => () => {
    history.push(generatePath(publicRoutes.detail.path, { imdbID }));
  };

  const getListMovie = useCallback(
    async (actions = ACTIONS.GET, pageVal) => {
      setLoading(true);
      try {
        const data = await services.searchMovie({
          s: querySearch || TITLE,
          page: pageVal || 1,
        });
        const response = get(data, "data.Response");
        if (response === "True") {
          const movies = get(data, "data.Search", []);
          const totalResults = get(data, "data.totalResults", 0);
          setTotalPage(Math.ceil(totalResults / 10));
          setTotal(totalResults);
          if (actions === ACTIONS.GET) {
            setMovieList(movies);
          } else if (actions === ACTIONS.LOAD_MORE) {
            setMovieList((s) => {
              return [...s, ...movies];
            });
          }
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    },
    [querySearch]
  );

  const handleObserver = useCallback((entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((s) => s + 1);
    }
  }, []);

  useEffect(() => {
    if (page <= totalPage && page > 1) {
      getListMovie(ACTIONS.LOAD_MORE, page);
    } else if (page <= totalPage && page === 1) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPage]);

  useEffect(() => {
    getListMovie();
  }, [getListMovie]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <div id='home'>
      <div className='movieSearch'>
        <p>"{querySearch || TITLE}"</p>
        <p>{total} movie</p>
      </div>
      <div className='movieContainer'>
        {movieList.map((el, index) => (
          <MovieCard
            key={index}
            Poster={el.Poster}
            Title={el.Title}
            imdbID={el.imdbID}
            Year={el.Year}
            Type={el.Type}
            onClickImage={onClickImage(el.Poster, el.Title)}
            onClickDetail={onClickDetail(el.imdbID)}
          />
        ))}
      </div>
      <div ref={loader}>
        {page < totalPage && <Button loading={loading} text='LoadMore' />}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <img src={modalContent.modalImage} alt={modalContent.modalDesc} />
      </Modal>
    </div>
  );
}

export default Home;
