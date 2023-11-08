import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import Link from "next/link";

const TablePage = ({ tasks, handleDeleteTask }: any) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(tasks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tasks.slice(start, end);
  }, [page, tasks]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="action">STATUS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item: any) => (
          <TableRow key={item.name}>
            {(columnKey) => {
              if (columnKey === "action") {
                return (
                  <TableCell>
                    <button
                      onClick={() => handleDeleteTask(item.id)}
                      className="bg-red-500 text-white p-2 rounded-lg ml-2"
                    >
                      Delete
                    </button>
                  </TableCell>
                );
              } else if (columnKey === "role") {
                return (
                  <TableCell>
                    <Link href={`/dashboard/${item.id}`}>
                      <button
                        className="bg-yellow-500 text-white p-2 rounded-lg ml-2"
                      >
                        Edit
                      </button>
                    </Link>
                  </TableCell>
                );
              } else {
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablePage;
