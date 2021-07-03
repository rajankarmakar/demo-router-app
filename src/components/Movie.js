import { useState, useEffect } from "react";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import Details from "./Details";

const Movie = () => {
  let match = useRouteMatch();

  const [recipe, setRecipe] = useState([]);
  const [details, setDetails] = useState({});
  const [detailID, setDetailID] = useState(null);

  useEffect(() => {
    const getRecepi = () => {
      let url = `${process.env.REACT_APP_BASE_URL}/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2Fadventure`;

      fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let item = data.map((item) => item.split("/")[2]);
          setRecipe((pre) => item);
        })
        .catch((err) => console.log(err));
    };

    getRecepi();

    return () => {
      return false;
    };
  }, []);

  useEffect(() => {
    const getData = () => {
      if (!detailID) {
        return;
      }

      let url = `${process.env.REACT_APP_BASE_URL}/title/get-details?tconst=${detailID}`;

      fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_X_RAPIDAPI_KEY,
          "x-rapidapi-host": process.env.REACT_APP_X_RAPIDAPI_HOST,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setDetails((pre) => data);
        })
        .catch((err) => console.log(err));
    };

    getData();
  }, [detailID]);

  const getDetails = (id) => {
    setDetailID(id);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ol>
            {recipe &&
              recipe.map((item) => (
                <Link key={item} to={`${match.url}/${item}`}>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => getDetails(item)}
                  >
                    {item}
                  </li>
                </Link>
              ))}
          </ol>
        </div>
        <div className="col-md-8">
          <Switch>
            <Route path={`${match.path}/:id`}>
              <Details details={details} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Movie;
