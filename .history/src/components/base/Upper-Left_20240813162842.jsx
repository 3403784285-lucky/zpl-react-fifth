import React, { useEffect, useRef } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TinyArea } from '@antv/g2plot';

const RealTimeStatistics = () => {
  const tradeAmountRef = useRef(null);
  const orderCountRef = useRef(null);

  const tradeAmountData = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];

  const orderCountData = [
    192, 243, 264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
  ];

  const yesterdayAmount = 2400;
  const todayAmount = 2434.23;
  const amountChange = ((todayAmount - yesterdayAmount) / yesterdayAmount) * 100;

  const yesterdayOrder = 890;
  const todayOrder = 894;
  const orderChange = ((todayOrder - yesterdayOrder) / yesterdayOrder) * 100;

  useEffect(() => {
    const tradeAmountChart = new TinyArea(tradeAmountRef.current, {
      height: 40, // 缩小高度
      autoFit: false,
      data: tradeAmountData,
      smooth: true,
      color: '#E5EDFE',
      pattern: { type: 'line', cfg: { stroke: '#5B8FF9' } },
      xAxis: {
        type: 'cat',
        label: {
          formatter: (text) => `${text}`,
        },
      },
    });

    const orderCountChart = new TinyArea(orderCountRef.current, {
      height: 40, // 缩小高度
      autoFit:
