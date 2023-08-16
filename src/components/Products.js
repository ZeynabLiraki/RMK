import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Products(props) {
  const token = JSON.parse(localStorage.getItem("token"));

  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  // const [columnDefs, setColumnDefs] = useState([
  //   { field: "make", filter: true },
  //   { field: "model", filter: true },
  //   { field: "price" },
  // ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: true, floatingFilter: true },
    { field: "title", filter: true, floatingFilter: true },
    { field: "price", filter: true, floatingFilter: true },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    fetch("https://dummyjson.com/auth/products", requestOptions)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData.products));
  }, []);

  return (
    <div>
      <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
        />
      </div>
    </div>
  );
}
