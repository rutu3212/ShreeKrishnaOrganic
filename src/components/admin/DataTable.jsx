import React from "react";
import {
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data found.",
  onEdit,
  onDelete,
  onView,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 10,
}) => {
  /* -----------------------------
     Loading State
  ----------------------------- */
  if (loading) {
    return (
      <div className="w-full bg-white border border-[#E6E1D8] rounded-2xl overflow-hidden">
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-12 rounded-xl bg-[#F1EFE5] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* -----------------------------
     Empty State
  ----------------------------- */
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white border border-[#E6E1D8] rounded-2xl">
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#E4EBD9] flex items-center justify-center">
            <PackageOpen
              size={28}
              className="text-[#56663D]"
              strokeWidth={1.7}
            />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-[#29321F]">
            No Data Available
          </h3>

          <p className="mt-2 max-w-sm text-sm text-[#8B8A7D]">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  /* -----------------------------
     Page Change
  ----------------------------- */
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    if (onPageChange) {
      onPageChange(page);
    }
  };

  /* -----------------------------
     Render Cell
  ----------------------------- */
  const renderCell = (column, row, index) => {
    if (column.render) {
      return column.render(row, index);
    }

    if (column.accessor) {
      return row[column.accessor];
    }

    return "-";
  };

  return (
    <div className="w-full bg-white border border-[#E6E1D8] rounded-2xl overflow-hidden">
      {/* =========================
          Desktop / Tablet Table
      ========================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[750px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#FBFAF6] border-b border-[#E6E1D8]">
              {columns.map((column, index) => (
                <th
                  key={column.key || column.accessor || index}
                  className={`px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#777568] ${
                    column.align === "center"
                      ? "text-center"
                      : column.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {column.label}
                </th>
              ))}

              {(onView || onEdit || onDelete) && (
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#777568]">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#EEECE5]">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || row._id || rowIndex}
                className="group hover:bg-[#FBFAF6] transition-colors duration-200"
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={
                      column.key ||
                      column.accessor ||
                      columnIndex
                    }
                    className={`px-5 py-4 text-sm text-[#55574D] ${
                      column.align === "center"
                        ? "text-center"
                        : column.align === "right"
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {renderCell(column, row, rowIndex)}
                  </td>
                ))}

                {/* Actions */}
                {(onView || onEdit || onDelete) && (
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(row)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#56663D] bg-[#E4EBD9] hover:bg-[#D8E2CA] transition"
                          title="View"
                          aria-label="View"
                        >
                          <Eye size={17} />
                        </button>
                      )}

                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9A7B2F] bg-[#F3E8C8] hover:bg-[#EADDB8] transition"
                          title="Edit"
                          aria-label="Edit"
                        >
                          <Edit size={17} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#A6533D] bg-[#FAE9E4] hover:bg-[#F4DAD3] transition"
                          title="Delete"
                          aria-label="Delete"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          Mobile Cards
      ========================= */}
      <div className="md:hidden divide-y divide-[#EEECE5]">
        {data.map((row, rowIndex) => (
          <div
            key={row.id || row._id || rowIndex}
            className="p-5 hover:bg-[#FBFAF6] transition"
          >
            <div className="space-y-3">
              {columns.map((column, columnIndex) => (
                <div
                  key={
                    column.key ||
                    column.accessor ||
                    columnIndex
                  }
                  className="flex items-start justify-between gap-4"
                >
                  <span className="text-xs font-medium text-[#99978C] shrink-0">
                    {column.label}
                  </span>

                  <div className="text-sm text-[#55574D] text-right">
                    {renderCell(column, row, rowIndex)}
                  </div>
                </div>
              ))}

              {/* Mobile Actions */}
              {(onView || onEdit || onDelete) && (
                <div className="pt-3 mt-3 border-t border-[#EEECE5] flex items-center justify-end gap-2">
                  {onView && (
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E4EBD9] text-[#56663D] text-xs font-medium"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  )}

                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3E8C8] text-[#9A7B2F] text-xs font-medium"
                    >
                      <Edit size={15} />
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FAE9E4] text-[#A6533D] text-xs font-medium"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          Pagination
      ========================= */}
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-[#E6E1D8] bg-[#FBFAF6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Result Information */}
          <p className="text-xs sm:text-sm text-[#777568]">
            Showing{" "}
            <span className="font-medium text-[#55574D]">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-[#55574D]">
              {Math.min(
                currentPage * itemsPerPage,
                data.length + (currentPage - 1) * itemsPerPage
              )}
            </span>
          </p>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 rounded-lg border border-[#DCD8CE] bg-white flex items-center justify-center text-[#56663D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1EFE5] transition"
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
              .map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-[#56663D] text-white"
                      : "border border-[#DCD8CE] bg-white text-[#55574D] hover:bg-[#F1EFE5]"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 rounded-lg border border-[#DCD8CE] bg-white flex items-center justify-center text-[#56663D] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F1EFE5] transition"
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

