import {Link} from "react-router-dom";
import React from "react";

export default function Pagination(props) {
  const view = props.retrieved && props.retrieved['hydra:view'];
  if (!view) return null;

  const {
          'hydra:first': first,
          'hydra:previous': previous,
          'hydra:next': next,
          'hydra:last': last
        } = view;

  if (!(first || previous || next || last)) {
    return null
  } else {
    return (
      <nav aria-label="Page navigation">
        <Link
          to={first ? encodeURIComponent(first) : '#'}
          className={`btn ${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            previous  ? encodeURIComponent(previous):  '#'
          }
          className={`btn ${previous ? '' : ' disabled'}`}
        >
          {/*<span aria-hidden="true">&larr;</span>*/} Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn ${next ? '' : ' disabled'}`}
        >
          Next {/*<span aria-hidden="true">&rarr;</span>*/}
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn ${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
    );
  }
}
