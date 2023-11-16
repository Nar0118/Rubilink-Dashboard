import React, { useEffect, useState, useMemo } from 'react';
import { PaginationProps, Pagination } from 'antd';
import { useProject } from '@/services/projects/projectContext';
import { useModal } from '@/services/context/ModalContext';
import { IProjectData } from '@/services/base/types';
import ProjectEditModal from '../projectEditModal';
import ProjectDetailsModal from '../projectDetailsModal';
import ButtonAction from '../ButtonAction';

import styles from './index.module.scss';
import { nunito, openSans } from '@/src/utils/fonts';

const ProjectsTable: React.FC<{ isOrganizationAdmin: boolean }> = ({
  isOrganizationAdmin,
}) => {
  const [projectData, setProjectData] = useState<IProjectData['data']>();
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [totalNumber, setTotalNumber] = useState<number>(1);
  const projectService = useProject();
  const { update } = useModal();

  const firstNumber = useMemo(() => {
    return (page - 1) * perPage + 1;
  }, [page, perPage]);

  const lastNumber = useMemo(() => {
    return (
      firstNumber -
      1 +
      (projectData?.data?.length ? projectData?.data.length : 0)
    );
  }, [firstNumber, projectData]);

  const onPageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setPage(page);
    setPerPage(pageSize);
  };

  const fetchData = async () => {
    try {
      const response = await projectService.getProjects(page, perPage);
      if (!response) {
        return;
      }

      setTotalNumber(response.total);
      setProjectData(response);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage, update]);

  return (
    <div className={styles.projects}>
      <div className={`${styles.projectsHeaders} ${nunito.className}`}>
        <div className={styles.headerSpace}></div>
        <p>Project</p>
        <p>Industry</p>
        <p>Admin</p>
        <p>Email</p>
      </div>
      {projectData?.data &&
        projectData.data.map(value => (
          <ProjectDetailsModal data={value} key={value._id}>
            <div className={styles.projectsData}>
              <div
                className={styles.iconContainer}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <ProjectEditModal data={value} updateData={fetchData}>
                  <ButtonAction data={value} type="edit" />
                </ProjectEditModal>
                {isOrganizationAdmin && (
                  <ButtonAction
                    data={value}
                    type="remove"
                    deleteType="Project"
                  />
                )}
              </div>
              <div className={`${styles.valueContainer} ${openSans.className}`}>
                <p>{value.name}</p>
                <p>{value.industry}</p>
                <p>{value.admin?.email || '-'}</p>
                <p>{value.email}</p>
              </div>
            </div>
          </ProjectDetailsModal>
        ))}
      <div
        className={`${styles.PaginationContainer} ${
          totalNumber / perPage > 50 ? styles.perPageStyle : ''
        } ${openSans.className}`}
      >
        <p className={styles.showingNumberText}>
          Showing {firstNumber}-{lastNumber} of {totalNumber} results
        </p>
        <p className={styles.showSizeText}>Showing</p>
        <Pagination
          responsive={true}
          defaultPageSize={perPage}
          onChange={onPageChange}
          pageSizeOptions={[5, 10, 20]}
          showSizeChanger
          total={totalNumber}
          className={openSans.className}
        />
      </div>
    </div>
  );
};

export default ProjectsTable;
