import React from 'react';
import Switch from './Switch';

export default {
  component: Switch,
  title: 'Switch'
};

const Template = (args) => <Switch {...args} />;

/**
 * ok this is testing
 */
export const Default = Template.bind({});

Default.args = {
  switchId: '12',
  switchName: 'kasunTest'
};

// This is sample doc
