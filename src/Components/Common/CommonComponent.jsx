import * as React from "react";
import { Column } from '@ant-design/charts';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const tablePaginationStyle = makeStyles({
    caption: {
      fontFamily: "poppins"
    },
    toolbar: {
      "& > p:nth-of-type(2)": {
        fontFamily: "poppins"
      },
      "& > p:nth-of-type(1)": {
        fontFamily: "poppins"
      }
    }
});

const data = [
  { type: 'Jan', value: 25 },
  { type: 'Feb', value: 36 },
  { type: 'Mar', value: 75 },
  { type: 'Apr', value: 60 },
  { type: 'May', value: 90 },
  { type: 'Jun', value: 150 },
  { type: 'July', value: 130 },
  { type: 'Aug', value: 120 },
  { type: 'Sept', value: 65 },
  { type: 'Oct', value: 65 },
  { type: 'Nov', value: 90 },
  { type: 'Dec', value: 100 },
];

const DemoColumn = () => {
  const config = {
    data,
    xField: 'type',
    yField: 'value',
    style: {
      fill: ({ value }) => {
        if (value >= '90') {
          return '#1FD655';
        }
        if(value <= 50) {
          return '#FF474C';
        }
        return '#FFFF2E';
      },

    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
        return '';
      },
      offset: 10,
    },
    legend: false,
  };
  return (
    <Box sx={{ height: "353px" }}>
      <Column {...config} />
    </Box>
  );
};


const DemoPie = (props) => {
  // const { labels } = props;
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );
  const labels= [
    {
      title: "Nike",
      color: "#FF3131"
    },
    {
      title: "Addidas",
      color: "#4D4DFF"
    },
    {
      title: "Sparx",
      color: "#FFFF33"
    },
    {
      title: "Beta",
      color: "#0FFF50"
    },
  ]
  const data = {
    labels: [ 'Nike', 'Addidas', 'Sparx', 'Bata' ],
    datasets: [{
      label: 'Order',
      data: [ 25, 36, 75, 60 ],
      backgroundColor: [ '#FF3131', '#4D4DFF', '#FFFF33', '#0FFF50' ],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ]
    }]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <Box>
      <Box sx={{ width: "200px", ml: 6}}>
        <Doughnut
          data={data}
          options={options}
        ></Doughnut>
      </Box>
      <TableContainer sx={{ width: "90%", mt: 2 }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "poppins" }}>Brand</TableCell>
              <TableCell sx={{ fontFamily: "poppins" }} align="center">Orders</TableCell>
              <TableCell sx={{ fontFamily: "poppins" }} align="center">Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {labels.map((item, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontFamily: "poppins" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "10px", height: "10px", border: "1px solid", mr: 1, bgcolor: item.color, borderColor: item.color}}></Box>
                    {item.title}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: "poppins" }} align="center">15</TableCell>
                <TableCell sx={{ fontFamily: "poppins" }} align="center">&#8377; 2145</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};



export { DrawerHeader, tablePaginationStyle, DemoColumn, DemoPie };