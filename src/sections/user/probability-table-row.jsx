import { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ProbabilityTableRow({
  selected,
  id,
  percentage,
  number,
  handleClick,
  dataFiltered
}) {
  console.log('XXSXSXSXSXSSX', {
    selected,
    id,
    percentage,
    number,
  });

  const [open, setOpen] = useState(null);
  const [newPercentage, setNewPercentage] = useState(percentage); // corrected state name and initial value

  // const handlePercentageChange = (e,id) => {
  //   const newPercentageValue = parseFloat(e.target.value);
  //   console.log('my ~~~~~~~~ newPercentage', id)
  //   if (!isNaN(newPercentageValue)) {
  //     setNewPercentage(newPercentageValue);
  //   } else {
  //     console.error('Invalid input:', e.target.value);
  //     // Handle invalid input, for example, you can reset the newPercentage
  //     // or display an error message to the user.
  //     // For now, I'll just leave it as it is.
  //   }
  // };
  const handlePercentageChange = () => {

    // const { value ,id } = event.target;
    // const newPercentageValue = parseFloat(e.target.value);
    // const id = e.target.id;
    // console.log('my ~~~~~~~~ newPercentage', id)
    // if (!isNaN(newPercentageValue)) {
    //   setNewPercentage(newPercentageValue);
    // }
    // Now you have both 'value' and 'id' available to use
    // Do whatever you want with them
  };
  
  
  useEffect(() => {
    console.log('my ~~~~~~~~2 newPercentagenewPercentage', newPercentage,dataFiltered)
  }, [newPercentage])

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    console.log('Edit clicked for id:', id);
  };

  const handleDelete = () => {
    handleCloseMenu();
    console.log('Delete clicked for id:', id);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>
          <Typography variant="body2">{id}</Typography>
        </TableCell>
        <TableCell>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '10ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="standard-basic" value={newPercentage}
              onChange={(event) => handlePercentageChange(event, id)} />
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{number}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

ProbabilityTableRow.propTypes = {
  selected: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};
