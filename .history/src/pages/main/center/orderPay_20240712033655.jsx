double calculatedAmount = orderBuyPointsDTO.getAmount() * 0.1;
BigDecimal bd = new BigDecimal(calculatedAmount);
bd = bd.setScale(2, RoundingMode.HALF_UP); // 设置精度为两位小数，使用四舍五入模式

// 将 BigDecimal 类型的值设置给 orders 的 amount 属性
orders.setAmount(bd.doubleValue());