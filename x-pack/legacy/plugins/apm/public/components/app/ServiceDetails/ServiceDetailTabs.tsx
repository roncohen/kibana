/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { i18n } from '@kbn/i18n';
import React from 'react';
import { IUrlParams } from '../../../context/UrlParamsContext/types';
import { HistoryTabs } from '../../shared/HistoryTabs';
import { ErrorGroupOverview } from '../ErrorGroupOverview';
import { TransactionOverview } from '../TransactionOverview';
import { ServiceMetrics } from '../ServiceMetrics';
import { ServiceMap } from '../ServiceMap';

interface Props {
  transactionTypes: string[];
  urlParams: IUrlParams;
  isRumAgent?: boolean;
  agentName?: string;
}

export function ServiceDetailTabs({
  transactionTypes,
  urlParams,
  isRumAgent,
  agentName
}: Props) {
  const { serviceName } = urlParams;
  const headTransactionType = transactionTypes[0];
  const transactionsTab = {
    title: i18n.translate('xpack.apm.serviceDetails.transactionsTabLabel', {
      defaultMessage: 'Transactions'
    }),
    path: headTransactionType
      ? `/${serviceName}/transactions/${headTransactionType}`
      : `/${serviceName}/transactions`,
    routePath: `/${serviceName}/transactions/:transactionType?`,
    render: () => (
      <TransactionOverview
        urlParams={urlParams}
        serviceTransactionTypes={transactionTypes}
      />
    ),
    name: 'transactions'
  };
  const errorsTab = {
    title: i18n.translate('xpack.apm.serviceDetails.errorsTabLabel', {
      defaultMessage: 'Errors'
    }),
    path: `/${serviceName}/errors`,
    render: () => {
      return <ErrorGroupOverview />;
    },
    name: 'errors'
  };
  const metricsTab = {
    title: i18n.translate('xpack.apm.serviceDetails.metricsTabLabel', {
      defaultMessage: 'Metrics'
    }),
    path: `/${serviceName}/metrics`,
    render: () => <ServiceMetrics agentName={agentName} />,
    name: 'metrics'
  };

  const serviceMapTab = {
    title: i18n.translate('xpack.apm.serviceDetails.mapTabLabel', {
      defaultMessage: 'Service Map'
    }),
    path: `/${serviceName}/servicemap`,
    render: () => <ServiceMap layout="breadthfirst" />,
    name: 'servicemap'
  };
  const tabs = isRumAgent
    ? [transactionsTab, errorsTab, serviceMapTab]
    : [transactionsTab, errorsTab, serviceMapTab, metricsTab];

  return <HistoryTabs tabs={tabs} />;
}
