// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../layout/Sidebar";
// import Navbar from "../layout/Navbar";
// import { CardContent } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";

// const columns = [
//   { id: "nama_organisasi", label: "Nama Organisasi", minWidth: 100 },
//   { id: "jabatan", label: "Jabatan", minWidth: 100 },
//   { id: "awal_periode", label: "Awal Periode", minWidth: 100 },
//   { id: "akhir_periode", label: "Akhir Periode", minWidth: 100 },
//   { id: "deskripsi", label: "Deskripsi", minWidth: 100 },
// ];

// const OrganisasiList = () => {
//   const [organisasi, setOrganisasi] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     getOrganisasi();
//   }, []);

//   const getOrganisasi = async () => {
//     try {
//       // Retrieve the access token from localStorage
//       const accessToken = localStorage.getItem("accessToken");

//       const response = await axios.get("http://localhost:5000/datadiri/organisasi", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       setOrganisasi(response.data);
//       console.log(response.data);
//     } catch (error) {
//       // Handle errors, e.g., unauthorized access
//       console.error("Error fetching organisasi data:", error);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleEditClick = (id) => {
//     // Navigasi ke halaman edit dengan mengirimkan ID data sebagai bagian dari URL
//     navigate(`/edit-organisasi/${id}`);
//   };

//   const handleDeleteClick = async (itemId) => {
//     if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
//       try {
//         const accessToken = localStorage.getItem("accessToken");
  
//         // Send a DELETE request to the server to delete the item with a specific ID
//         await axios.delete(`http://localhost:5000/datadiri/organisasi/${itemId}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
  
//         // After successful deletion, you can update the state or refresh the data
//         getOrganisasi(); // You may want to call this to refresh the data.
//       } catch (error) {
//         console.error("Error deleting data:", error);
//       }
//     }
//   };
  

//   return (
//     <>
//       <Navbar />
//       <Box height={100} />
//       <Box sx={{ display: "flex" }}>
//         <Sidebar />
//         <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
//           <Card>
//             <CardContent>
//               {/* Add New Organisasi Item */}
//               <Link to={`/add-organisasi`}>
//                 <Button variant="contained" color="success">
//                   Add New
//                 </Button>
//               </Link>
//               {/* Organisasi Table */}
//               <Paper sx={{ width: "100%", overflow: "hidden" }}>
//                 <TableContainer sx={{ maxHeight: 440 }}>
//                   <Table stickyHeader aria-label="sticky table">
//                     <TableHead>
//                       <TableRow>
//                         {columns.map((column) => (
//                           <TableCell
//                             key={column.id}
//                             align="left"
//                             style={{ minWidth: column.minWidth }}
//                           >
//                             {column.label}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {organisasi
//                         .slice(
//                           page * rowsPerPage,
//                           page * rowsPerPage + rowsPerPage
//                         )
//                         .map((item, index) => (
//                           <TableRow key={item.id}>
//                             {columns.map((column) => {
//                               const { id } = column;
//                               const value = item[id];

//                               return (
//                                 <TableCell key={id} align="left">
//                                   {value}
//                                 </TableCell>
//                               );
//                             })}
//                               <TableCell align="left">
//                                 <IconButton
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={() => handleEditClick(item.id)}
//                                 >
//                                     <EditIcon />
//                                     </IconButton>
//                                 </TableCell>
//                                 <TableCell align="left">
//                                     <IconButton
//                                     variant="contained"
//                                     color="error"
//                                     onClick={() => handleDeleteClick(item.id)}
//                                     >
//                                     <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                           </TableRow>
//                         ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 {/* Pagination */}
//                 <TablePagination
//                   rowsPerPageOptions={[10, 25, 100]}
//                   component="div"
//                   count={organisasi.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </Paper>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default OrganisasiList;

import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { CardContent } from "@mui/material";
import OrganisasiTable from "../storage/OrganisasiTable";

const OrganisasiList = () => {
    return (
        <>
          <Navbar />
          <Box height={100} />
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
              <OrganisasiTable />
            </Box>
          </Box>
        </>
      );
};

export default OrganisasiList;