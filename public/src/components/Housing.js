import { Button } from 'antd';
import { useHistory } from 'react-router';

export default function Food() {
  const history = useHistory();

  const navigateToElectricity = () => {
    history.push('/Electricity')
  }

  const navigateToFuel= () => {
    history.push('/Fuel')
  }

  return (
    <div className="Food">
        <div className="Title-text">Choose a Housing Category</div>

        <Button size="large" type="primary" onClick={navigateToElectricity}>Electricity</Button>
        <Button size="large" type="primary" onClick={navigateToFuel}>Fuel</Button>
    </div>
  );
}