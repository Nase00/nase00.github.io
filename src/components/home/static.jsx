import React from 'react';
import {
  Layout,
  Panel,
  Card,
  CardTitle,
  Button
} from 'react-toolbox';
import { Style } from 'radium';

import styles from './styles';

const Home = () => (
  <Layout className='home-container'>
    <Panel>
      <Style rules={styles}/>
      <Card className='home-card'>
        <CardTitle
          avatar='https://en.gravatar.com/userimage/84275550/80d76a6b454c7f4388cbcfd38f7f6878.jpg'
          title='Sean Owiecki'/>
        <Button className='portfolio-link' label='Email' href='mailto:seanowiecki@gmail.com'/>
        <Button className='portfolio-link' label='Github' href='http://github.com/Nase00' target='_blank'/>
        <Button className='portfolio-link' label='LinkedIn' href='https://www.linkedin.com/in/seanowiecki' target='_blank'/>
        <Button className='portfolio-link' label='Bitbucket' href='https://bitbucket.org/seanowiecki' target='_blank'/>
        <Button className='portfolio-link' label='NPM' href='https://www.npmjs.com/~nase' target='_blank'/>
      </Card>
    </Panel>
  </Layout>
);

export default Home;
