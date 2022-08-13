import React from "react";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function TableComp({
  keyfield,
  options,
  columns,
  data,
  selectoption,
  placeholertext,
}) {
  const { SearchBar } = Search;

  //console.log("data on tablecomp", keyfield, options, columns, data);
  return (
    <>
      <PaginationProvider pagination={paginationFactory(options)}>
        {({ paginationProps, paginationTableProps }) => (
          <div>
            <ToolkitProvider
              keyField={keyfield}
              columns={columns}
              data={data}
              search
            >
              {(toolkitprops) => (
                <>
                  <div class="row mb-3">
                    {/* <div class="col-md-7">
                      <h2 class="main-title mb-4">Prescriptions</h2>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <SearchBar
                          {...toolkitprops.searchProps}
                          className="form-control search-prescription"
                          style={{ width: "500px" }}
                          placeholder={
                            placeholertext
                              ? placeholertext
                              : "Search by Name, ID"
                          }
                        />
                      </div>
                    </div>

                    <div class="col-md-6 text-right sort-right">
                      <div class="form-group">
                        {/* <select name="" id="sort" class="custom-select">
                          <option value="all">All</option>
                          <option value="Accepted">Accepted</option>
                          <option value="InProcess">InProcess</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select> */}
                        {selectoption && (
                          <>
                            <label for="sort">Status By:</label>
                            {selectoption}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <BootstrapTable
                    {...toolkitprops.baseProps}
                    {...paginationTableProps}
                  />
                </>
              )}
            </ToolkitProvider>

            <PaginationListStandalone {...paginationProps} />
          </div>
        )}
      </PaginationProvider>
    </>
  );
}
