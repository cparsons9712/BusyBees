import ComingSoonPage from "./ComingSoon";
import { useEffect, useState } from "react";
import useAxiosFunction from "../../Hooks/useAxiosFunction";
import axios from "../../APIs/jsonPH";

export default function Test() {
  const [data, error, loading, axiosFetch] = useAxiosFunction();
  const [name, setName] = useState("")
  const [id, setId] = useState()

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/all",
    });
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/delete/${id}`,
    });
  };

  return (
    <div>
      <h2>Testing Section</h2>
      <hr></hr>

      {loading && <p>Loading ...</p>}

      {!loading && error && <p>{error} </p>}

      {!loading && !error && data?.length &&

        data.map((d, i) => {

          return <p key={i}>{`${d.id}: ${d.name}`}</p>;
        })}

      {!loading && !error && !data &&
        <p> No results returned </p>
      }
        <input value={id} placeholder="id" onChange={(e)=> {setId(e.target.value)}}/>
        <input value={name} placeholder='name' onChange={(e)=> {setName(e.target.value)}}/>
      <button onClick={handleSubmit}>Add Name</button>
    </div>
  );
}

/*

  test Endpoints:

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  GET http://localhost:8000/api/users/test => Get Test Success

  export default function Test() {
    const [data, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/',
    })

    return (
        <div>
            <h2>Testing Section</h2>
            <hr></hr>

            {loading && <p>Loading ...</p>}
            {!loading && error && <p>{error} </p>}
            {!loading && !error && data && <p>{data}</p>}
            {!loading && !error && !data && <p> No results returned </p>}


        </div>
    );
  }

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  GET http://localhost:8000/api/users/test/all =>
  [
    { id: 1, name: 'Joe' },
    { id: 2, name: 'Mary' },
    { id: 3, name: 'Riley' },
  ]
  export default function Test() {
    const [data, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/all',
    })

    return (
        <div>
            <h2>Testing Section</h2>
            <hr></hr>

            {loading && <p>Loading ...</p>}
            {!loading && error && <p>{error} </p>}
            {!loading && !error && data && data.map((d)=> {return <li>{d.name}</li>})}
            {!loading && !error && !data && <p> No results returned </p>}


        </div>
    );
  }

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  POST http://localhost:8000/api/users/test/create =>
  [
    { id: 1, name: 'Joe' },
    { id: 2, name: 'Mary' },
    { id: 3, name: 'Riley' },
    { id: 4, name: 'Henry' }
  ]
  export default function Test() {
  const [data, error, loading, axiosFetch] = useAxiosFunction();
  const [name, setName] = useState("")

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/all",
    });
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "POST",
      url: "/create",
      requestConfig: {
        data: {
          name
        },
      },
    });
  };

  return (
    <div>
      <h2>Testing Section</h2>
      <hr></hr>

      {loading && <p>Loading ...</p>}

      {!loading && error && <p>{error} </p>}

      {!loading && !error && data?.length &&

        data.map((d, i) => {

          return <p key={i}>{`${d.id}: ${d.name}`}</p>;
        })}

      {!loading && !error && !data &&
        <p> No results returned </p>
      }
        <input value={name} onChange={(e)=> {setName(e.target.value)}}/>
      <button onClick={handleSubmit}>Add Name</button>
    </div>
  );
}

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  PUT http://localhost:8000/api/users/test/update/:id =>
    export default function Test() {
  const [data, error, loading, axiosFetch] = useAxiosFunction();
  const [name, setName] = useState("")
  const [id, setId] = useState()

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/all",
    });
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: `update/${id}`,
      requestConfig: {
        data: {
          name
        },
      },
    });
  };

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
DELETE http://localhost:8000/api/users/test/delete/:id

export default function Test() {
  const [data, error, loading, axiosFetch] = useAxiosFunction();
  const [name, setName] = useState("")
  const [id, setId] = useState()

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/all",
    });
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/delete/${id}`,
    });
  };

  return (
    <div>
      <h2>Testing Section</h2>
      <hr></hr>

      {loading && <p>Loading ...</p>}

      {!loading && error && <p>{error} </p>}

      {!loading && !error && data?.length &&

        data.map((d, i) => {

          return <p key={i}>{`${d.id}: ${d.name}`}</p>;
        })}

      {!loading && !error && !data &&
        <p> No results returned </p>
      }
        <input value={id} placeholder="id" onChange={(e)=> {setId(e.target.value)}}/>
        <input value={name} placeholder='name' onChange={(e)=> {setName(e.target.value)}}/>
      <button onClick={handleSubmit}>Add Name</button>
    </div>
  );
}


*/
