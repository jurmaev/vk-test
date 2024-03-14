import { useState } from 'react';
import { AppRoot, Div, Panel, Tabs, TabsItem, View } from '@vkontakte/vkui';
import { AgeForm, FactForm } from './components';

function App() {
  const [activePanel, setActivePanel] = useState('fact');

  return (
    <AppRoot>
      <Tabs>
        <TabsItem
          selected={activePanel === 'fact'}
          onClick={() => setActivePanel('fact')}
          id='tab-fact'
          aria-controls='fact'>
          Fact
        </TabsItem>
        <TabsItem
          selected={activePanel === 'age'}
          onClick={() => setActivePanel('age')}
          id='tab-age'
          aria-controls='age'>
          Age
        </TabsItem>
      </Tabs>
      <Div>
        <View activePanel={activePanel}>
          <Panel tabIndex={0} aria-labelledby='tab-fact' id='fact'>
            <FactForm />
          </Panel>
          <Panel tabIndex={0} aria-labelledby='tab-age' id='age'>
            <AgeForm />
          </Panel>
        </View>
      </Div>
    </AppRoot>
  );
}

export default App;
