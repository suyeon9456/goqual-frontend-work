import React from 'react';

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import MainChart from './MainChart';
import Brightness from './Brightness';

const Dashboard = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                기기 상태 조회 대시보드
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <MainChart />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol sm={12}>
          <CCard className="mb-4">
            <CCardHeader>전구 제어 대시보드</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={12}>
                  <Brightness />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
