import { useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TableHead,
  TablePagination,
  Box,
} from '@mui/material';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'link', label: 'Link', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

// ----------------------------------------------------------------------

const SLIDERS = [
  {
    id: 1,
    title: 'Summer Sale',
    image: '/assets/images/sliders/slider1.jpg',
    link: '/summer-sale',
    status: 'Active',
  },
  {
    id: 2,
    title: 'New Arrivals',
    image: '/assets/images/sliders/slider2.jpg',
    link: '/new-arrivals',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Special Offers',
    image: '/assets/images/sliders/slider3.jpg',
    link: '/special-offers',
    status: 'Inactive',
  },
];

// ----------------------------------------------------------------------

export default function SlidersPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = SLIDERS.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">App Sliders</Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Slider
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < SLIDERS.length}
                        checked={SLIDERS.length > 0 && selected.length === SLIDERS.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SLIDERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, title, image, link, status } = row;
                    const selectedSlider = isSelected(id);

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedSlider}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedSlider} onChange={() => handleClick(id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Box
                            component="img"
                            alt={title}
                            src={image}
                            sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1 }}
                          />
                        </TableCell>

                        <TableCell align="left">{title}</TableCell>

                        <TableCell align="left">{link}</TableCell>

                        <TableCell align="left">
                          <Typography
                            variant="caption"
                            sx={{
                              p: 0.5,
                              borderRadius: 1,
                              color: status === 'Active' ? 'success.main' : 'error.main',
                              bgcolor: status === 'Active' ? 'success.lighter' : 'error.lighter',
                            }}
                          >
                            {status}
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={SLIDERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
} 