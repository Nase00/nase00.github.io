import React from 'react';
import { Layout, Panel, Card, CardTitle, Button } from 'react-toolbox';
import { Style } from 'radium';

import styles from './styles';

const Home = () => (
  <Layout className='home-container'>
    <Panel>
      <Style rules={styles}/>
      <Card className='home-card'>
        <CardTitle
          avatar='https://en.gravatar.com/userimage/58657398/139ee990940a3d8a77ae5999f6502a1b.jpg'
          title='Sean Owiecki'
          subtitle='Software Engineer'/>
        <Button className='portfolio-link' label='Email' href='mailto:seanowiecki@gmail.com'/>
        <Button
          className='portfolio-link'
          label='Github'
          href='http://github.com/Nase00'
          target='_blank'/>
        <Button
          className='portfolio-link'
          label='Medium'
          href='https://medium.com/@NaseZero'
          target='_blank'/>
        <Button
          className='portfolio-link'
          label='Hackaday Projects'
          href='https://hackaday.io/Nase'
          target='_blank'/>
        <Button
          className='portfolio-link'
          label='LinkedIn'
          href='https://www.linkedin.com/in/seanowiecki'
          target='_blank'/>
        <Button
          className='portfolio-link'
          label='NPM'
          href='https://www.npmjs.com/~nase'
          target='_blank'/>
      </Card>
    </Panel>
  </Layout>
);

export default Home;
