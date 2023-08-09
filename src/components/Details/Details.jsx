import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

import useStyles from './styles';
import useTransactions from '../../useTransactions';

const DetailsCard = ({ title, subheader }) => {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();
  const options = {
    legend: {
      labels: {
        fontColor: "white", // Set the font color of the legend labels
      },
    },
  };
  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      {/* <CardHeader title={title} subheader={subheader} /> */}
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5" className={classes.total}>
          ${total}
        </Typography>
        <Doughnut data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
