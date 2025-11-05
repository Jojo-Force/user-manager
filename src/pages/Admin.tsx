import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'umi';

const Admin: React.FC = (props) => {
  const {children} = props;
  const intl = useIntl();
  return (
    <PageHeaderWrapper>
      {children}
    </PageHeaderWrapper>
  );
};

export default Admin;
