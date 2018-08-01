import React from 'react';
import { Layout, Panel, Card, CardTitle, Button } from 'react-toolbox';
import { Style } from 'radium';

import styles from './styles';

const Home = () => (
  <Layout className='home-container'>
    <Panel>
      <Style rules={styles}/>
      <Card className='home-card'>Welcome to my home page</Card>
    </Panel>
  </Layout>
);

export default Home;
