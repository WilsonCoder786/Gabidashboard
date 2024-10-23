import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  TextField,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const initialNews = [
  { id: 1, title: 'Breaking News 1', content: 'Content of breaking news 1.' },
  { id: 2, title: 'Breaking News 2', content: 'Content of breaking news 2.' },
];

const NewsManagement = () => {
  const [newsList, setNewsList] = useState(initialNews);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditNews = (news) => {
    setCurrentNews(news);
    setTitle(news.title);
    setContent(news.content);
    setEditModalOpen(true);
  };

  const handleDeleteNews = (news) => {
    setCurrentNews(news);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setNewsList((prevData) => prevData.filter((news) => news.id !== currentNews.id));
    setDeleteModalOpen(false);
  };

  const handleSaveNewsChanges = () => {
    if (currentNews) {
      setNewsList((prevData) =>
        prevData.map((news) => (news.id === currentNews.id ? { ...news, title, content } : news))
      );
    } else {
      setNewsList((prevData) => [...prevData, { id: prevData.length + 1, title, content }]);
    }
    setEditModalOpen(false);
    setTitle('');
    setContent('');
  };

  const handleViewDetails = (news) => {
    setCurrentNews(news);
    setViewModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        News Management
      </Typography>
      <Button
        style={{ backgroundColor: '#DF3870' }}
        variant="contained"
        onClick={() => {
          setCurrentNews(null);
          setTitle('');
          setContent('');
          setEditModalOpen(true);
        }}
        sx={{ mb: 2 }}
      >
        Add New News
      </Button>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.title}</TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton onClick={() => handleViewDetails(news)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEditNews(news)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteNews(news)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit/Add News Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <DialogTitle>{currentNews ? 'Edit News' : 'Add News'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              margin="dense"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewsChanges} color="primary">
              {currentNews ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete News Modal */}
      {currentNews && (
        <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the news titled <strong>{currentNews.title}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* View Details Modal */}
      {currentNews && (
        <Dialog open={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
          <DialogTitle>{currentNews.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{currentNews.content}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewModalOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default NewsManagement;
