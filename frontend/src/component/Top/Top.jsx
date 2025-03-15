import React from "react";
import "./Top.css";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";

export default function Top({ title }) {
  return (
    <div className="top-container">
      <ul className="breadcrumbs">
        <li>
          <Link to="/">Home</Link> <MdNavigateNext />
        </li>
        <li>{title}</li>
      </ul>
    </div>
  );
}
