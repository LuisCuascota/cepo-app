import {
  Button,
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getFormattedDate } from "../../../shared/utils/date.utils";
import { useListEntriesState } from "./state/useListEntriesState";
import { EntryRow } from "../../../store/interfaces/Entry/entry.interfaces";
import { EntryModal } from "../../../components/modals/Entry/EntryModal";
import { PersonSearch } from "../../../components/search/personSearch/PersonSearch";

export const ListEntries = () => {
  const { entryRows, pagination, isLoading, modal, search } =
    useListEntriesState();

  return (
    <Container>
      <PersonSearch
        disableSearch={false}
        onChangeSelector={search.onSelectPerson}
        onCleanSelector={search.onClearPerson}
      />
      <TableContainer component={Paper}>
        <EntryModal
          entryData={modal.rowSelected}
          open={modal.isModalOpen}
          handleClose={modal.onCloseModal}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">{"Nº"}</TableCell>
              <TableCell align="left">{"Socio"}</TableCell>
              <TableCell align="left">{"Fecha"}</TableCell>
              <TableCell align="left">{"Monto"}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? Array(pagination.rowsPerPage)
                  .fill(0)
                  .map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Array(5)
                        .fill(0)
                        .map((_, colIndex) => (
                          <TableCell key={colIndex}>
                            <Skeleton animation="wave" />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              : entryRows.map((row: EntryRow) => (
                  <TableRow key={row.number}>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{`${row.names} ${row.surnames}`}</TableCell>
                    <TableCell>{getFormattedDate(row.date)}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => modal.onOpenModal(row)}
                      >
                        {"Detalle"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={pagination.count}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
        />
      </TableContainer>
    </Container>
  );
};
