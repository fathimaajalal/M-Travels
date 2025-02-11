import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = ({ token }) => {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setBookings(response.data.bookings);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token]);

  // Process data for charts
  const processDataForCharts = () => {
    const statusCounts = {};
    const vehicleCounts = {};
    const RevenueData = {};

    bookings.forEach(booking => {
      // Count bookings by status
      statusCounts[booking.status] = (statusCounts[booking.status] || 0) + 1;

      // Count bookings by vehicle
      vehicleCounts[booking.vehicle] = (vehicleCounts[booking.vehicle] || 0) + 1;

      // Calculate Revenue by date
      const date = new Date(booking.date).toLocaleDateString();
      RevenueData[date] = (RevenueData[date] || 0) + booking.amount;
    });

    const statusData = Object.keys(statusCounts).map(status => ({
      name: status,
      Bookings: statusCounts[status]
    }));

    const vehicleData = Object.keys(vehicleCounts).map(vehicle => ({
      name: vehicle,
      Bookings: vehicleCounts[vehicle]
    }));

    const RevenueChartData = Object.keys(RevenueData).map(date => ({
      date,
      Revenue: RevenueData[date]
    }));

    return { statusData, vehicleData, RevenueChartData };
  };

  const { statusData, vehicleData, RevenueChartData } = processDataForCharts();

  // Color theme matching #C586A5
  const colorTheme = ['#C586A5', '#A58BC5', '#86A5C5', '#A5C586', '#C5A586', '#86C5A5'];

  // Function to download PDF
  // const downloadPDF = () => {
  //   const doc = new jsPDF();

  //   // Add title
  //   doc.setFontSize(18);
  //   doc.text('Booking Reports', 10, 20);

  //   // Reverse booking data for PDF
  //   const reversedBookings = [...bookings].reverse();

  //   // Add booking data as a table
  //   const tableData = reversedBookings.map(booking => [
  //     booking.vehicle,
  //     booking.status,
  //     booking.paymentMethod,
  //     booking.payment ? 'Done' : 'Pending',
  //     new Date(booking.bookDate).toLocaleDateString(),
  //     new Date(booking.date).toLocaleDateString(),
  //     `${booking.firstName} ${booking.lastName}`,
  //     booking.phone,
  //     `₹${booking.amount.toFixed(2)}` // Use ₹ for currency
  //   ]);

  //   doc.autoTable({
  //     head: [['Vehicle', 'Status', 'Payment Method', 'Payment', 'Booked For', 'Booked On', 'Name', 'Phone', 'Revenue']],
  //     body: tableData,
  //     startY: 30,
  //     theme: 'grid',
  //     styles: { fontSize: 10 },
  //     headStyles: { fillColor: '#C586A5' } // Use the main color for the table header
  //   });

  //   // Add Revenue chart to PDF
  //   doc.addPage();
  //   doc.setFontSize(18);
  //   doc.text('Revenue Over Time', 10, 20);

  //   // Create a table for Revenue data
  //   const RevenueTableData = RevenueChartData.map(data => [data.date, `₹${data.Revenue.toFixed(2)}`]);

  //   doc.autoTable({
  //     head: [['Date', 'Revenue']],
  //     body: RevenueTableData,
  //     startY: 30,
  //     theme: 'grid',
  //     styles: { fontSize: 10 },
  //     headStyles: { fillColor: '#C586A5' }
  //   });

  //   // Save the PDF
  //   doc.save('booking_reports.pdf');
  // };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Add title
    doc.setFontSize(18);
    doc.text('Booking Reports', 10, 20);
  
    // Reverse booking data for PDF
    const reversedBookings = [...bookings].reverse();
  
    // Add booking data as a table
    const tableData = reversedBookings.map(booking => [
      booking.vehicle,
      booking.status,
      booking.paymentMethod,
      booking.payment ? 'Done' : 'Pending',
      new Date(booking.bookDate).toLocaleDateString(),
      new Date(booking.date).toLocaleDateString(),
      `${booking.firstName} ${booking.lastName}`,
      booking.phone,
      // `₹${booking.amount.toFixed(2)}` // Use ₹ for currency
      `Rs. ${booking.amount.toFixed(2)}`
    ]);
  
    // Define column widths
    const columnWidths = [30, 30, 30, 20, 30, 30, 40, 30, 25]; // Adjust widths as needed
  
    doc.autoTable({
      head: [['Vehicle', 'Status', 'Payment Method', 'Payment', 'Booked For', 'Booked On', 'Name', 'Phone', 'Revenue']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: '#C586A5' }, // Use the main color for the table header
      columnStyles: {
        8: { cellWidth: 25, halign: 'right' } // Set width and right-align for the Revenue column
      },
      margin: { horizontal: 10 }, // Add margin for better spacing
      columnWidth: 'wrap' // Adjust column widths automatically
    });
  
    // Add Revenue chart to PDF
    doc.addPage();
    doc.setFontSize(18);
    doc.text('Revenue Over Time', 10, 20);
  
    // Create a table for Revenue data
    const RevenueTableData = RevenueChartData.map(data => [data.date, `Rs. ${data.Revenue.toFixed(2)}`]);
  
    doc.autoTable({
      head: [['Date', 'Revenue']],
      body: RevenueTableData,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 10 },
      headStyles: { fillColor: '#C586A5' },
      columnStyles: {
        1: { cellWidth: 30, halign: 'right' } // Set width and right-align for the Revenue column
      }
    });
  
    // Save the PDF
    doc.save('booking_reports.pdf');
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold mb-8 text-center">Booking Reports</h3>

      {/* Download PDF Button */}
      <div className="text-center mb-8">
        <button
          onClick={downloadPDF}
          className="bg-[#C586A5] hover:bg-[#A58BC5] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Download Report as PDF
        </button>
      </div>

      {/* Bar Chart for Bookings by Vehicle */}
      <div className="w-full p-4">
        <h4 className="text-xl font-semibold mb-4 text-center">Bookings by Vehicle</h4>
        <BarChart
          width={800}
          height={400}
          data={vehicleData}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }} // Increased bottom margin for labels
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45} // Rotate labels for better readability
            textAnchor="end"
            interval={0} // Show all labels
            tick={{ fontSize: 12 }} // Adjust font size
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Bookings" fill="#C586A5" /> {/* Use the specified color for bars */}
        </BarChart>
      </div>

      {/* Pie Chart for Bookings by Status */}
      <div className="w-full p-4">
        <h4 className="text-xl font-semibold mb-4 text-center">Bookings by Status</h4>
        <PieChart width={800} height={400}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
            outerRadius={150} // Increased outer radius for a larger pie chart
            fill="#8884d8"
            dataKey="Bookings"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorTheme[index % colorTheme.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Line Chart for Revenue Over Time */}
      <div className="w-full p-4">
        <h4 className="text-xl font-semibold mb-4 text-center">Revenue Over Time</h4>
        <LineChart
          width={800}
          height={400}
          data={RevenueChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Revenue" stroke="#C586A5" strokeWidth={2} /> {/* Use the specified color for the line */}
        </LineChart>
      </div>
    </div>
  );
};

export default Reports;