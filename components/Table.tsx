import React from 'react';

export interface ColumnDefinition<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  items: T[];
  columns: ColumnDefinition<T>[];
}

function Table<T>({ items, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
