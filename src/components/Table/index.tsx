'use client';
import React, { useEffect, useState } from 'react';
import { Table as AntdTable, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import './index.scss';
import { IMyTable } from '@/services/base/types';
import { nunito, openSans } from '@/src/utils/fonts';

const Table: React.FC<IMyTable> = ({
  data,
  changePage,
  changePageSize,
  columns,
  total,
  onRow,
  type,
}) => {
  const [pageInformation, setPageInformation] = useState({
    page: 1,
    pagination: 10,
  });
  const [clickedRows, setClickedRows] = useState<string[]>([]);

  const from = pageInformation.page === 1 ? 1 : 1 + pageInformation.pagination;
  const to =
    total && pageInformation.page * pageInformation.pagination < total
      ? pageInformation.pagination * pageInformation.page
      : total;

  useEffect(() => {
    if (!clickedRows.length) {
      return;
    }
    const handleGlobalClick = () => {
      setClickedRows([]);
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, [clickedRows]);
  return (
    <div style={{ position: 'relative' }}>
      <AntdTable
        className={nunito.className}
        onRow={record => ({
          onClick: () => {
            onRow && onRow(record);
            type === 'project' &&
              setClickedRows(prevClickedRows => {
                if (prevClickedRows.includes(record._id)) {
                  return prevClickedRows.filter(key => key !== record._id);
                }
                return [...prevClickedRows, record._id];
              });
          },
          className: `${clickedRows.includes(record._id) ? 'clicked' : ''} ${
            openSans.className
          }`,
        })}
        columns={columns}
        dataSource={data}
        loading={{
          indicator: (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 50,
                    color: '#5d5fef',
                  }}
                  spin
                />
              }
            />
          ),
          spinning: !data,
        }}
        scroll={{ x: 1300 }}
        pagination={{
          position: ['bottomCenter'],
          total,
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          style: { fontWeight: 400 },
          onChange: (page, pageSize) => {
            changePage(page);
            changePageSize(pageSize);
            setPageInformation({
              page,
              pagination: pageSize,
            });
          },
        }}
        style={{ borderRadius: '8px', borderSpacing: '5px 0' }}
      />
      <div className={`${styles.tableInformation} ${openSans.className}`}>
        Showing {from}-{to} of {total} results
      </div>

      <span className={`${styles.showingText} ${openSans.className}`}>
        Showing
      </span>
    </div>
  );
};

export default Table;
