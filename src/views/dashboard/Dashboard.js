import React, { Suspense } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';

import DeviceStateChart from './DeviceStateChart';
import BrightnessControl from './BrightnessControl';
import Skeleton from '../../components/Skeleton';
import ErrorBoundary from '../../components/ErrorBoundary';

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
          <Suspense
            fallback={<Skeleton level={4} style={{ height: '260px', marginTop: '40px' }} />}
          >
            <ErrorBoundary>
              <DeviceStateChart />
            </ErrorBoundary>
          </Suspense>
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
                  <ErrorBoundary>
                    <BrightnessControl />
                  </ErrorBoundary>
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
