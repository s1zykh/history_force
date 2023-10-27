import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Children, cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePage } from "../pagination/paginationSlice";

import "./carousel.scss";

const Carousel = ({ children }) => {
  const dispatch = useDispatch();
  const { activePage } = useSelector((state) => state.pagination);

  const [pages, setPages] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (Math.abs(Math.floor(offset / 800)) <= activePage - 1) {
      setOffset(offset * 0 - (activePage - 1) * 800);
    } else {
      activePage !== 1
        ? setOffset(offset + (activePage - 1) * 800)
        : setOffset(0);
    }
  }, [activePage, offset]);

  const handleLeftClick = () => {
    setOffset((state) => {
      const newState = state + 800;
      return Math.min(newState, 0);
    });
    dispatch(setActivePage(-1));
  };

  const handleRightClick = () => {
    setOffset((state) => {
      const newState = state - 800;
      const maxOffset = -(800 * 5);
      return Math.max(newState, maxOffset);
    });
    dispatch(setActivePage(1));
  };

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            height: "100%",
            minWidth: `100%`,
            maxWidth: "100%",
          },
        });
      })
    );
  }, [children]);

  return (
    <div className="main-container">
      {offset === 0 ? null : (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="arrowLeft"
          onClick={handleLeftClick}
        />
      )}
      <div className="window">
        <div
          className="allItems"
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          {pages}
        </div>
      </div>
      {offset === -(800 * 5) ? null : (
        <FontAwesomeIcon
          icon={faChevronRight}
          className="arrowRigt"
          onClick={handleRightClick}
        />
      )}
    </div>
  );
};

export default Carousel;
