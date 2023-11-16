import React, { ReactNode } from 'react';
import { DataType, IProjectEditData, Status } from '@/services/base/types';
import { TableColumnsType, Tooltip } from 'antd';
import styles from './index.module.scss';
import ButtonAction from '../ButtonAction';
import OrganizationEditModal from '../OrganizationEditModal';
import ProjectCreateModal from '../ProjectCreateModal';
import ProjectEditModal from '../projectEditModal';
import { UserRolesData } from '@/src/utils/constants';
import { nunito, openSans } from '@/src/utils/fonts';

const getOrganizationColumns = (
  fetchData: () => void,
  fetchProjects: () => Promise<void>,
): TableColumnsType<DataType> => [
  {
    title: '',
    dataIndex: 'index',
    key: '#',
    ellipsis: { showTitle: false },
    render: (text, record, index): ReactNode => {
      return (
        <div className={styles.actionPart}>
          <ProjectCreateModal
            fetchData={fetchProjects}
            organization={record._id}
            organizationName={record.name}
          >
            <ButtonAction data={record} type="plus" />
          </ProjectCreateModal>
          <OrganizationEditModal data={record} fetchData={fetchData}>
            <ButtonAction type="edit" />
          </OrganizationEditModal>
          <ButtonAction data={record} type="remove" />
        </div>
      );
    },
  },
  {
    title: 'Organization',
    dataIndex: 'name',
    key: 'Organization',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    key: 'Industry',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Admin Name',
    dataIndex: 'admin',
    key: 'Admin Name',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record?.name ? (
        <Tooltip placement="topLeft" title={record.name}>
          {record.name}
        </Tooltip>
      ) : record?.email ? (
        <Tooltip placement="topLeft" title={record?.email}>
          {record?.email}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'Email',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Subscription Plan',
    dataIndex: 'subscriptionPlans',
    key: 'Subscription Plan',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: subscriptionPlans =>
      subscriptionPlans.length ? subscriptionPlans.join(',') : '-',
  },
  {
    title: 'Size',
    dataIndex: 'size',
    key: 'Size',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'Phone',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
];

const getProjectsColumns = (
  fetchData: () => void,
): TableColumnsType<IProjectEditData> => [
  {
    title: '',
    dataIndex: 'index',
    key: '#',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 20,
    render: (text, record, index): ReactNode => {
      return (
        <div className={styles.actionPart} onClick={e => e.stopPropagation()}>
          <ProjectEditModal data={record} updateData={fetchData}>
            <ButtonAction type="edit" />
          </ProjectEditModal>
          <ButtonAction
            data={record as DataType}
            type="remove"
            deleteType="Project"
          />
        </div>
      );
    },
  },
  {
    title: 'Projects',
    dataIndex: 'name',
    key: 'Projects',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 100,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'Organization',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 150,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record?.name}>
          {record?.name}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    key: 'Industry',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 100,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Admin Name',
    dataIndex: 'admin',
    key: 'Admin Name',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 130,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record?.email}>
          {record?.email}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'Email',
    ellipsis: { showTitle: false },
    className: nunito.className,
    width: 150,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
];

const statusColors = {
  pending: '#FFD6B0',
  accepted: '#BDB0FF',
};

const userManagementColumns: TableColumnsType<any> = [
  {
    title: '',
    dataIndex: 'index',
    key: 'index',
    width: 50,
    className: nunito.className,
    render: (text, record, index): ReactNode => {
      return (
        <div className={styles.actionPart}>
          <ButtonAction
            data={record}
            type="remove"
            deleteType={record.status === 'pending' ? 'Invitation' : 'admin'}
          />
        </div>
      );
    },
  },
  {
    title: 'Name',
    //change it  to name when we will have it in BE
    dataIndex: 'name',
    width: 200,
    key: 'Name',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'Email',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'Role',
    ellipsis: { showTitle: false },
    className: nunito.className,
    render: record =>
      record ? (
        <Tooltip placement="topLeft" title={UserRolesData[record]}>
          {UserRolesData[record]}
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    title: 'Organizations & Projects',
    render: record =>
      record.Organization ? (
        record.Organization.name
      ) : record.Project ? (
        <div className={`${openSans.className} ${styles.orgProjects}`}>
          <Tooltip
            placement="topLeft"
            title={
              <>
                <div>{record.Project.name}</div>
                <span>{record.Project.organization?.name}</span>
              </>
            }
          >
            <div
              style={{
                maxWidth: 250,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record.Project.name}
            </div>
            <span>{record.Project.organization?.name}</span>
          </Tooltip>
        </div>
      ) : (
        '-'
      ),
    key: 'Organizations & Projects',
    ellipsis: { showTitle: false },
    className: nunito.className,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 150,
    ellipsis: { showTitle: false },
    className: nunito.className,
    align: 'center',
    render: (key: Status) => (
      <div
        style={{
          backgroundColor: statusColors[key],
        }}
        className={`${styles.statusButton} ${openSans.className}`}
      >
        {key[0].toUpperCase() + key.slice(1).toLocaleLowerCase()}
      </div>
    ),
  },
];

export { getOrganizationColumns, userManagementColumns, getProjectsColumns };
