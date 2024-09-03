import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportDataToExcel = (data: any[], fileName = 'data.xlsx') => {
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    // Generate a binary string representing the workbook
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // Use file-saver to save the file on the client side
    saveAs(blob, fileName);
};
