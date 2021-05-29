import { Button } from 'antd';

export default function Food() {
  return (
    <div className="Food">
        <div id="Main-text">Choose a Food Category</div>

        <Button size="large" type="primary">Bus</Button>
        <Button size="large" type="primary">Flying</Button>
        <Button size="large" type="primary">Rail</Button>
        <Button size="large" type="primary">Taxi</Button>
        <Button size="large" type="primary">Vehicle</Button>
    </div>
  );
}