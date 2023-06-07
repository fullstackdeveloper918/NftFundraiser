import React from "react";

const ShowList = ({
  data,
  loading,
  totalPage,
  currentPage,
  fetchData,
  card,
  emptyText,
}) => {
  return (
    <div className="row items explore-items h-auto">
      {loading && data?.length === 0 ? (
        <Loader />
      ) : (
        <>
          {/* {data?.length > 0 ? (
            <> */}
              {data?.map((item, idx) => card({ item, idx }))}

              {loading && data?.length > 0 && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader height="40px" width="40px" />
                </div>
              )}

              {totalPage !== currentPage && data?.length !== 0 && (
                <div
                  className="morebutton"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <a
                    onClick={(e) => fetchData(currentPage + 1)}
                    className="btn btn-bordered-white"
                  >
                    Load More
                  </a>
                </div>
              )}
            {/* </>
          ) : (
            <div className="col-12 col-sm-12 col-lg-12">
              <h2 className="allproj2">{emptyText}</h2>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default ShowList;
