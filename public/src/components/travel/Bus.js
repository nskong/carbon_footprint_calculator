import { Input, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Bus() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);

    const navigateToHome = () => {
        history.push('/')
    }

    const calculateEmissions = (value) => {
        let miles = value.target.value;
        fetch("/bus/emissions?miles=" + miles, {
            method: 'GET'
          }).then((response) => {
            return response.json();
          }).then((data) => {
              setEmissions(data);
          })
    }

    return (
        <div className="Bus">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            <Input
                size='large'
                placeholder='enter the miles traveled here'
                onPressEnter={calculateEmissions}>
            </Input>

            {
                (emissions) &&
                <div>
                    <p>Your emissions is {emissions} g/km CO2</p>
                    <Button size="large" type="primary" onClick={navigateToHome}>Restart</Button>
                </div>
            }
        </div>
  );
}