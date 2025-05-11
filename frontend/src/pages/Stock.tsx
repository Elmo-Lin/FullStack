import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField
} from '@mui/material';

interface Purchase {
  date: string;
  price: number;
  publicCount: number; // 公提
  selfCount: number;   // 自提
}

const StockPage: React.FC = () => {
  // 多筆買入紀錄
  const [purchases, setPurchases] = useState<Purchase[]>([
    { date: '', price: 0, publicCount: 0, selfCount: 0 }
  ]);
  // 現價
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  // 處理買入紀錄輸入
  const handlePurchaseChange = (
    index: number,
    field: keyof Purchase,
    raw: string
  ) => {
    const newPurchases = [...purchases];
    if (field === 'date') {
      newPurchases[index].date = raw;
    } else {
      const num = Number(raw.replace(/\D/g, ''));
      newPurchases[index][field] = isNaN(num) ? 0 : num;
    }
    setPurchases(newPurchases);
  };

  // 新增一筆買入紀錄
  const addPurchase = () => {
    setPurchases([
      ...purchases,
      { date: '', price: 0, publicCount: 0, selfCount: 0 }
    ]);
  };

  // 計算
  const totalSelfCost = purchases.reduce(
    (sum, p) => sum + p.price * p.selfCount,
    0
  );
  const totalPublic = purchases.reduce(
    (sum, p) => sum + p.publicCount,
    0
  );
  const totalSelf = purchases.reduce(
    (sum, p) => sum + p.selfCount,
    0
  );
  const totalShares = totalPublic + totalSelf;
  const currentValue = currentPrice * totalShares;
  const profit = currentValue - totalSelfCost;
  const profitPercent =
    totalSelfCost > 0 ? (profit / totalSelfCost) * 100 : 0;

  return (
    <div style={{ padding: '1rem', maxWidth: 700 }}>
      <h2>TSMC 認股</h2>

      {/* 買入紀錄表格 */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell>成本</TableCell>
            <TableCell>公提</TableCell>
            <TableCell>自提</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <TextField
                  type="date"
                  value={p.date}
                  onChange={e => handlePurchaseChange(idx, 'date', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  value={p.price}
                  onChange={e => handlePurchaseChange(idx, 'price', e.target.value)}
                  placeholder="0"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  value={p.publicCount}
                  onChange={e => handlePurchaseChange(idx, 'publicCount', e.target.value)}
                  placeholder="0"
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  value={p.selfCount}
                  onChange={e => handlePurchaseChange(idx, 'selfCount', e.target.value)}
                  placeholder="0"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        onClick={addPurchase}
        variant="contained"
        style={{ marginTop: '1rem' }}
      >
        新增一筆
      </Button>

      {/* 現價輸入 */}
      <div style={{ marginTop: '2rem' }}>
        <TextField
          label="現價"
          type="text"
          value={currentPrice}
          onChange={e => {
            const num = Number(e.target.value.replace(/\D/g, ''));
            setCurrentPrice(isNaN(num) ? 0 : num);
          }}
          placeholder="0"
        />
      </div>

      {/* 損益顯示 */}
      <div style={{ marginTop: '1.5rem' }}>
        <p>
          總成本(自提): <strong>{totalSelfCost.toFixed(2)}</strong>
        </p>
        <p>
          現值(公提+自提): <strong>{currentValue.toFixed(2)}</strong>
        </p>
        <p style={{ fontSize: '1.25rem', color: profit >= 0 ? 'red' : 'green' }}>
          損益: <strong>{profit.toFixed(2)}</strong> (
          <strong>{profitPercent.toFixed(2)}%</strong>)
        </p>
      </div>
    </div>
  );
};

export default StockPage;
