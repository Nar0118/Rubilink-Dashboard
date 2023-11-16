import React, { ReactNode, useEffect, useState, useMemo } from 'react';
import {
  IOrganizationData,
  IProjectData,
  IProjectResponseData,
  IRedirectTitle,
  ProjectDetailsFormProps,
} from '@/services/base/types';
import { useOrganizations } from '@/services/organizations/OrganizationContext';
import { useProject } from '@/services/projects/projectContext';
import Table from '@/src/components/Table';
import CreateButton from '@/src/components/CreateButton';
import {
  getOrganizationColumns,
  getProjectsColumns,
} from '@/src/components/Table/datas';
import OrganizationCreateModal from '@/src/components/OrganizationCreateModal';
import ProjectCreateModal from '@/src/components/ProjectCreateModal';
import InvitationSuccessModal from '@/src/components/InvitationSuccessModal';
import { useModal } from '@/services/context/ModalContext';
import InvitationForm from '@/src/components/InvitationForm';
import ProjectDetailsSuperUserModal from '../ProjectDetailsSuperUser';
import { nunito, poppins } from '@/src/utils/fonts';

import styles from './index.module.scss';

const Dashboard = () => {
  const { update } = useModal();
  const organizationService = useOrganizations();
  const projectService = useProject();
  const [organizationData, setOrganizationData] =
    useState<IOrganizationData['data']>();
  const [projectData, setProjectData] = useState<IProjectData['data']>();
  const [page, setPage] = useState<number>(1);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [detailsData, setDetailsData] = useState<IProjectResponseData>();
  const [projectPage, setProjectPage] = useState<number>(1);
  const [perProjectPage, setProjectPerPage] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [activeTitle, setActiveTitle] = useState<string>('Organizations');
  const [redirectTitle, setRedirectTitle] = useState<IRedirectTitle[]>([
    {
      id: 1,
      title: 'Organizations',
      active: true,
    },
    {
      id: 2,
      title: 'Projects',
      active: false,
    },
  ]);

  const showModal = (data: IProjectResponseData) => {
    setIsDetailModalOpen(true);
    setDetailsData(data);
  };

  const handleCancel = () => {
    setIsDetailModalOpen(false);
  };

  const handleTitleClick = (clickedId: number) => {
    const updatedRedirectTitle = redirectTitle.map(item => {
      if (item.id === clickedId) {
        setActiveTitle(item.title);
        return {
          ...item,
          active: true,
        };
      }
      return {
        ...item,
        active: false,
      };
    });
    setRedirectTitle(updatedRedirectTitle);
    window.localStorage.setItem(
      'activeTab',
      JSON.stringify(updatedRedirectTitle),
    );
  };

  const fetchData = async () => {
    try {
      const response = await organizationService.getOrganizations(
        page,
        perPage,
      );
      if (!response) {
        return;
      }
      setOrganizationData(response);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectService.getProjects(
        projectPage,
        perProjectPage,
      );
      if (!response) {
        return;
      }
      setProjectData(response);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    const localActive = window.localStorage.getItem('activeTab');

    if (localActive) {
      const parsedValue = JSON.parse(localActive);

      const activeTitles = parsedValue
        .filter((item: IRedirectTitle) => item.active)
        .map((item: IRedirectTitle) => item.title)[0];

      setRedirectTitle(parsedValue);
      setActiveTitle(activeTitles);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, perPage, update]);

  useEffect(() => {
    fetchProjects();
  }, [projectPage, perProjectPage, update]);

  const organizationColumns = useMemo(() => {
    return getOrganizationColumns(fetchData, fetchProjects);
  }, []);

  const projectColumns = useMemo(() => {
    return getProjectsColumns(fetchProjects);
  }, []);

  return (
    <>
      <div className={styles.dashboardWrapper}>
        <div className={`${styles.actionsButtonGroup} ${nunito.className}`}>
          <OrganizationCreateModal fetchData={fetchData}>
            <CreateButton title="Create Organization" />
          </OrganizationCreateModal>
          <ProjectCreateModal fetchData={fetchProjects}>
            <CreateButton title="Create Project" />
          </ProjectCreateModal>
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.tableCategoryHeading}>
            <div>
              {redirectTitle.map(
                (item: IRedirectTitle): ReactNode => (
                  <div
                    key={item.id}
                    className={`${item.active ? styles.activeCategory : ''} ${
                      poppins.className
                    }`}
                    onClick={() => handleTitleClick(item.id)}
                  >
                    {item.title}
                  </div>
                ),
              )}
            </div>

            <div
              className={`${styles.inviteButton} ${nunito.className}`}
              onClick={() => setOpenForm(true)}
            >
              Invite Admin
            </div>
          </div>
          {activeTitle === 'Organizations' ? (
            <Table
              columns={organizationColumns}
              changePage={setPage}
              changePageSize={setPerPage}
              {...organizationData}
            />
          ) : (
            <Table
              onRow={showModal}
              type="project"
              columns={projectColumns}
              changePage={setProjectPage}
              changePageSize={setProjectPerPage}
              {...projectData}
            />
          )}
        </div>
        <InvitationSuccessModal open={open} onCancel={() => setOpen(false)} />
        <InvitationForm
          open={openForm}
          onSuccess={() => setOpen(true)}
          onCancel={() => setOpenForm(false)}
        />
        <ProjectDetailsSuperUserModal
          isModalOpen={isDetailModalOpen}
          handleCancel={handleCancel}
          data={detailsData as ProjectDetailsFormProps}
        />
      </div>
    </>
  );
};

export default Dashboard;
