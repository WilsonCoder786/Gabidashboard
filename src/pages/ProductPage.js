import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Delete, Edit, Close } from '@mui/icons-material';
import { db } from '../service/firebase_config';
import './PostPage.css';

const ProductList = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRow, setCurrentRow] = useState(null);
  const [images, setImages] = useState([]);
  const [values, setValues] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
  });

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTableData(products);
        console.log(products[0].images)
      } catch (error) {
        console.error("Error fetching products from Firestore", error);
      }
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleFileChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleAddProduct = async () => {
    const imageUrls = await uploadImagesToCloudinary(images);
    const newProduct = {
      ...values,
      images: imageUrls,
    };

    try {
      const docRef = await addDoc(collection(db, "products"), newProduct);
      setTableData((prevData) => [...prevData, { id: docRef.id, ...newProduct }]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const uploadImagesToCloudinary = async (images) => {
    const imageUploadPromises = images.map((image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "newpresent");

      return axios.post(`https://api.cloudinary.com/v1_1/dkfgfnbst/image/upload`, formData)
        .then((response) => response.data.secure_url)
        .catch((error) => {
          console.error("Error uploading image to Cloudinary", error);
          return null;
        });
    });

    const imageUrls = await Promise.all(imageUploadPromises);
    return imageUrls.filter(url => url !== null);
  };

  const handleEditRow = (row) => {
    setCurrentRow(row);
    setValues({
      name: row.original.name,
      price: row.original.price,
      category: row.original.category,
      image: row.original.image,
    });
    setEditModalOpen(true);
  };

  const handleDeleteRow = (row) => {
    setCurrentRow(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (currentRow) {
      try {
        await deleteDoc(doc(db, "products", currentRow.id)); // Delete product from Firestore
        setTableData((prevData) => prevData.filter((item) => item.id !== currentRow.id));
        setDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting product from Firestore", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    const imageUrls = await uploadImagesToCloudinary(images);
    const updatedProduct = {
      ...values,
      images: imageUrls.length > 0 ? imageUrls : currentRow.original.images,
    };

    try {
      await updateDoc(doc(db, "products", currentRow.id), updatedProduct); // Update product in Firestore
      setTableData((prevData) =>
        prevData.map((product) =>
          product.id === currentRow.id ? { ...product, ...updatedProduct } : product
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product in Firestore", error);
    }
  };

  const columns = [
    { accessorKey: 'name', header: 'Product Name' },
    { accessorKey: 'price', header: 'Price', type: 'number' },
    { accessorKey: 'category', header: 'Category' },
    
    // Reorder Images column before Actions column
    {
      accessorKey: 'images',
      header: 'Images',
      Cell: ({ cell }) => {
        const imageUrls = cell.getValue(); // This should be an array of image URLs
        return imageUrls && imageUrls.length > 0 ? (
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product ${index}`}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            ))}
          </Box>
        ) : (
          <Typography>No Images</Typography> // Fallback text if no images are available
        );
      },
    },
  
    // Actions column (moved after Images column)
    {
      header: 'Actions',
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => handleEditRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  
  

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Product List
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography> // Replace with your loading component
      ) : (
        <MaterialReactTable
          columns={columns}
          data={tableData}
          renderTopToolbarCustomActions={() => (
            <Button onClick={() => setCreateModalOpen(true)} variant="contained">
              Add New Product
            </Button>
          )}
        />
      )}

      {/* Add Product Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
            fullWidth
            margin="dense"
          />
          <div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} color="primary">Add Product</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Modal */}
      {currentRow && (
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Product Name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Price"
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Category"
              value={values.category}
              onChange={(e) => setValues({ ...values, category: e.target.value })}
              fullWidth
              margin="dense"
            />
            <div>
              {currentRow.original.images?.map((img, index) => (
                <Box key={index} sx={{ display: 'inline-block', position: 'relative', marginRight: '10px' }}>
                  <img src={img} alt="product" width="50" height="50" />
                  <IconButton
                    onClick={() => {
                      const newImages = currentRow.original.images.filter((_, idx) => idx !== index);
                      setValues({ ...values, images: newImages });
                    }}
                    sx={{ position: 'absolute', top: '-5px', right: '-5px' }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              ))}
            </div>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveChanges} color="primary">Save Changes</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation Modal */}
      {currentRow && (
        <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this product?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ProductList;
