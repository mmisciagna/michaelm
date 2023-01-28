import * as React from 'react';
import {useState} from 'react';


interface HomePageProps {
  greeting: string;
}

const Button = (): React.ReactElement => {
  const [clickCount, setClickCount] = useState(0);
  const increment = () => setClickCount(clickCount + 1);

  return (
    <>
      <button onClick={increment}>
        {clickCount === 0 ? `Let's do it!` : `Keep going!`}
      </button>
      <span style={{marginLeft: '12px'}}>
        {clickCount}
      </span>
    </>
  );
}

export class HomePage extends React.Component<HomePageProps> {  
  render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.greeting}, Michael. What do yuh say?</h1>
        <Button />
      </>
    )
  }
}
