import { Input, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Taxi() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
    const [transitIsSelected, setTransitIsSelected] = useState(true);

    const navigateToHome = () => {
        history.push('/')
    }

    const calculateEmissionsFactor = (value) => {
        let miles = value.target.value;
        let category = "";

        fetch("/vehicle/" + category + "/emissions?miles=" + miles, {
            method: 'GET'
          }).then((response) => {
            return response.json();
          }).then((data) => {
              setEmissions(data);
          })
    }

    const toggleRailType = () => {
        setTransitIsSelected(!transitIsSelected);
    }

    return (
        <div className="Rail">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                transitIsSelected &&
                <div>
                    <Button size="large" type="primary">Transit Rail</Button>
                    <Button size="large" type="default" onClick={toggleRailType}>Commuter Rail</Button>
                </div>
            }

            {
                !transitIsSelected &&
                <div>
                    <Button size="large" type="default" onClick={toggleRailType}>Transit Rail</Button>
                    <Button size="large" type="primary">Commuter Rail</Button>
                </div>
            }

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