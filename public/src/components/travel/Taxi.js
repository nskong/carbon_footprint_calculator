import { Input, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Taxi() {
    const history = useHistory();
    const [fuelEconomy, setFuelEconomy] = useState("");
    const [emissions, setEmissions] = useState(null);
    const [emissionsFactor, setEmissionsFactor] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigateToHome = () => {
        history.push('/')
    }

    const displayErrorMessage = () => {
        setShowErrorMessage(true);
        setTimeout( function() { 
            setShowErrorMessage(false);
        }, 10000);
    }

    const getFuelEconomy = (value) => {
        setFuelEconomy(value.target.value);
    }

    const calculateEmissionsFactor = (value) => {
        let expectedLifetimeMiles = value.target.value;

        console.log(fuelEconomy);
        console.log(expectedLifetimeMiles);

        fetch("/vehicle/emissionsFactor?fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles, {
            method: 'GET'
          }).then((response) => {
            return response.json();
          }).then((data) => {
              setEmissionsFactor(data);
          })
    }

    const calculateEmissions = (value) => {
        let miles = value.target.value;

        fetch("/vehicle/emissions?miles=" + miles + "&emissionsFactor=" + emissionsFactor, {
            method: 'GET'
          }).then((response) => {
            if (response.status == 400) { 
                displayErrorMessage();
            } else {
                return response.json();
            }
          }).then((data) => {
              setEmissions(data);
          })
    }

    return (
        <div className="Rail">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                showErrorMessage && 
                <p className="Error-message">Please input a valid number</p>
            }

            <div>
                <Input
                    size='large'
                    placeholder='enter fuel economy (mpg)'
                    onChange={getFuelEconomy}>
                </Input>
                <Input
                    size='large'
                    placeholder='enter the expected lifetime miles'
                    onPressEnter={calculateEmissionsFactor}
                ></Input>
            </div>

            {
                emissionsFactor &&
                <Input
                    size='large'
                    placeholder='enter the miles traveled here'
                    onPressEnter={calculateEmissions}>
                </Input>
            }


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