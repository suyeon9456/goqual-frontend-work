import React from 'react';

import { CCard, CCardBody, CCol, CRow } from '@coreui/react';

import DeviceStateChart from './DeviceStateChart';
import BrightnessControl from './BrightnessControl';

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
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <DeviceStateChart />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol sm={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={12}>
                  <h4 id="traffic" className="card-title mb-0">
                    전구 제어 대시보드
                  </h4>
                </CCol>
                <CCol sm={12}>
                  <BrightnessControl />
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
