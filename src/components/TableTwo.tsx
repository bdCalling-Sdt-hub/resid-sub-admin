import React, { useEffect, useState } from 'react';
import baseAxios from '../../Config';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons library

const TableTwo = ({ type, title, setStatusData }: any) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [search, type, currentPage, token]);

  const fetchData = () => {
    setLoading(true);
    baseAxios.get(`/api/residences?acceptanceStatus=${type}&search=${search}&page=${currentPage}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setData(res.data.data.attributes.residences.data);
        setTotalPages(res.data.data.attributes.pagination.totalPage);
        if (type === "all") {
          setStatusData(res.data.data.attributes.residences);
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          "You are not authorised to sign in now" === error.response.data.message || "Error authorization" === error.response.data.message
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("yourInfo");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Entrez le nom de la résidence..."
            className="border border-gray-300 rounded-md p-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-primary focus:border-none hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            onClick={handleSearch}
          >
            Recherche
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Table header */}
        <div className="py-6 px-4 md:px-6 xl:px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title} Liste
          </h4>
        </div>

        {/* Table body */}
        {data.map((item) => (
          <div key={item._id} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-4 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="h-20 w-20 sm:h-12.5 sm:w-15 lg:h-16 lg:w-16 rounded-md overflow-hidden flex-shrink-0">
                  <img className="align-middle object-cover h-full w-full" src={item.photo[0].publicFileUrl} alt="Product" />
                </div>
                <p className="text-sm text-black dark:text-white">
                  {item.residenceName}
                </p>
              </div>
            </div>
            <div className="col-span-3 hidden items-center sm:flex">
              <p className={`text-sm text-black ${item.acceptanceStatus === "pending" && 'bg-meta-6'} ${item.acceptanceStatus === "accepted" && 'bg-success'} ${item.acceptanceStatus === "blocked" && 'bg-meta-1'}  p-[2px] rounded-xl px-3  dark:text-white`}>{
                item.acceptanceStatus === "pending" ? "En attente" :
                  item.acceptanceStatus === "accepted" ? "Accepté" :
                    item.acceptanceStatus === "blocked" ? "Bloqué" : <></>
              }</p>
            </div>

            <div className="col-span-1 flex items-center">
              <p onClick={() => navigate(`/residence/${item._id}`)} className="text-sm cursor-pointer text-meta-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              </p>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-end p-5">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePagination(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="flex justify-center items-center h-screen fixed inset-0 bg-opacity-50 bg-gray-200">
          <FaSpinner className="animate-spin text-4xl text-gray-700" />
        </div>
      )}
    </div>
  );
};

export default TableTwo;
