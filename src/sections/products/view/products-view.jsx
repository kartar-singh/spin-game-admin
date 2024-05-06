import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import probabilityService from 'src/api/probability';
import Scrollbar from 'src/components/scrollbar';
import ProbabilityTableRow from 'src/sections/user/probability-table-row';
import TableEmptyRows from 'src/sections/user/table-empty-rows';
import TableNoData from 'src/sections/user/table-no-data';
import UserTableHead from 'src/sections/user/user-table-head';
import UserTableToolbar from 'src/sections/user/user-table-toolbar';
import { applyFilterProbability, emptyRows, getComparator } from 'src/sections/user/utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState([])
  const [totalPercentage,setTotalPercentage] = useState()

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  useEffect(() => {
    if (users.length > 0) {
      const totalPercentage = users[0].reduce((accumulator, currentValue) => {
        return accumulator + currentValue.percentage;
      }, 0);
      console.log('Total Percentage:', totalPercentage);
      setTotalPercentage(totalPercentage);
    }
  }, [users]);

  useEffect(() => {
    console.log('Total Percentage: 2', totalPercentage);
  }, [totalPercentage]);
  

  useEffect(() => {
    const probabilityList = async () => {
      const myProbabilityList = await probabilityService.getProbability()
      console.log('my ~~~~~~~~ myProbabilityList', myProbabilityList)
      // Add an id property to each row
      const rowsWithIds = myProbabilityList?.probabilities.map((row, index) => ({ ...row, id: index + 1 }));
      // setRows(rowsWithIds);
      setUsers(myProbabilityList?.probabilities)
    }
    probabilityList()
  }, [])


  useEffect(() => {
    console.log('my ~~~~~~~~2', users)

  }, [])

  const handlePercentageChange = (e) => {
    const newPercentageValue = parseFloat(e.target.value);
    if (!isNaN(newPercentageValue)) {
      setNewPercentage(newPercentageValue);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered =
    applyFilterProbability({
      inputData: users,
      comparator: getComparator(order, orderBy),
      filterName,
    });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card>
    <UserTableToolbar
      numSelected={selected.length}
      filterName={filterName}
      onFilterName={handleFilterByName}
    />
  
    <Scrollbar>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 800 }}>
          <UserTableHead
            order={order}
            orderBy={orderBy}
            rowCount={users.length}
            numSelected={selected.length}
            onRequestSort={handleSort}
            onSelectAllClick={handleSelectAllClick}
            headLabel={[
              { id: 'id', label: 'id' },
              { id: 'probability', label: 'probability' },
              { id: 'Winning number', label: 'Winning number' },
            ]}
          />
          {console.log('my ~~~~~~~~ dataFiltered', dataFiltered)}
          <TableBody>
            {dataFiltered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return row.map((item) => (
                  <ProbabilityTableRow
                    key={item.id}
                    id={item.id}
                    percentage={item.percentage || 0}
                    number={item.number || 0}
                    selected={selected.indexOf(item.id) !== -1}
                    handleClick={(event) => handleClick(event, item.id)}
                    dataFiltered={dataFiltered}
                  />
                ));
              })
            }
  
            <TableEmptyRows
              height={77}
              emptyRows={emptyRows(page, rowsPerPage, users.length)}
            />
  
            {notFound && <TableNoData query={filterName} />}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <strong>Total Percentage:</strong> {totalPercentage}%
      </div>
    </Scrollbar>
  
    <TablePagination
      page={page}
      component="div"
      count={users.length}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[5, 10, 25]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Card>
  
  );
}

