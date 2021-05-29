import { Input, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Flying() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);

    const navigateToHome = () => {
        history.push('/')
    }

    const calculateEmissions = (value) => {
        let miles = value.target.value;
        let category = "";

        if (miles <= 300) {
            category = "short";
        } else if ((miles > 300) && (miles <= 2300)) {
            category = "medium";
        } else {
            category = "long";
        }

        fetch("/flying/" + category + "/emissions?miles=" + miles, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setEmissions(data);
        })
    }

    return (
        <div className="Flying">
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