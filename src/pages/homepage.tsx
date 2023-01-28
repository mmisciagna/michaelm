import * as React from "react";


interface HomePageProps {
  greeting?: string;
}

export class HomePage extends React.Component<HomePageProps> {  
  private Button(props: HomePageProps): React.ReactElement {
    const [btnCount, setBtnCount] = React.useState(0);
    const incrementBtnCount = () => setBtnCount(btnCount + 1);

    return (
      <>
        <button onClick={incrementBtnCount}>
          You've click me this many times:
        </button>
        <h1>{btnCount}</h1>
      </>
    );
  }

  render(): React.ReactNode {
    return (
      <>
        <h1>{this.props.greeting}, Michael. What do yuh say?</h1>
        <this.Button />
      </>
    )
  }
}
