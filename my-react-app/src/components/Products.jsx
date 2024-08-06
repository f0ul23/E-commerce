import React, { useState, useEffect } from "react";
// import { Link, Element } from 'react-scroll';
import { json, Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);
  const deleteproduct = async (id) => {
    let result = await fetch(`http://localhost:5000/deleted/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("record is deleted");
      getproducts();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } else {
      getproducts();
    }
  };

  const nomatch = () => {
    <span
      style={{
        fontSize: "23px",
        width: "200px",
        marginLeft: "280px",
        color: "whitesmoke",
      }}
    >
      :( No Result Found
    </span>;
  };

  return (
    <>
      <div className="Table">
        <p><b>Product List</b></p>
      </div>
      <input
        className="search fa fa-search"
        type="text"
        onChange={searchHandle}
      />
      <div className="list1">
        <table>
          <thead>
            <tr>
              <th id="sno">S.no</th>
              <th className="rowclm">Name</th>
              <th className="rowclm">Price</th>
              <th className="rowclm">Category</th>
              <th className="rowclm1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0
              ? products.map((item, index) => (
                  <tr key={item._id}>
                    <td className="rowclm">{index + 1}</td>
                    <td className="rowclm">{item.name}</td>
                    <td className="rowclm">${item.price}</td>
                    <td className="rowclm">{item.category}</td>
                    <td className="rowclm">
                      <button
                        className="deletebut"
                        onClick={() => deleteproduct(item._id)}
                      >
                        Delete
                      </button>
                      <Link className="updatebut" to={"/update/" + item._id}>
                        Update
                      </Link>
                    </td>
                  </tr>
                ))
              : nomatch()}
          </tbody>
        </table>
      </div>
    </>
  );
}
