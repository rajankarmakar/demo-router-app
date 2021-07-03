import { useParams } from "react-router-dom";

const Details = ({ details }) => {
  let { id } = useParams();

  return (
    <>
      <h1>This is the details page of the id: {id} </h1>
      <hr />
      {details && (
        <>
          <h2>Movie Name: {details.title} </h2>
          <img
            alt={details.title}
            style={{ width: "50%" }}
            src={details?.image?.url}
          />
          <h4>Type: {details.titleType} </h4>
          <p>Release Year: {details.year}</p>
          <p>Run Time In Minutes : {details.runningTimeInMinutes} m</p>
        </>
      )}
    </>
  );
};

export default Details;
