import { InputNumber, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

/**
 * Vehicle page
 */
export default function Vehicle() {
    const history = useHistory();
    const [fuelEconomy, setFuelEconomy] = useState("");
    const [emissions, setEmissions] = useState(null);
    const [emissionsFactor, setEmissionsFactor] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigateToHome = () => {
        history.push('/')
    }

    // Displays an error message. Times out the error message after 10 seconds
    const displayErrorMessage = () => {
        setShowErrorMessage(true);
        setTimeout( function() { 
            setShowErrorMessage(false);
        }, 10000);
    }

    // Helper function that sets state of component. Used separately because we need both
    // fuel economy and lifetime miles input before on press can be used
    const getFuelEconomy = (value) => {
        setFuelEconomy(value.target.value);
    }

    // Calculates the emissions factor on enter press to lifetime mileage input. 
    // Displays error message on 400 response
    const calculateEmissionsFactor = (value) => {
        let expectedLifetimeMiles = value.target.value;

        fetch("/vehicle/emissionsFactor?fuelEconomy=" + fuelEconomy + "&expectedLifetimeMiles=" + expectedLifetimeMiles, {
            method: 'GET'
          }).then((response) => {
            return response.json();
          }).then((data) => {
              setEmissionsFactor(data);
          })
    }

    // calculates the emissions on return to mileage input. Displays error message on 
    // 400 response.
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
                <InputNumber
                    size='large'
                    placeholder='enter fuel economy (mpg)'
                    onChange={getFuelEconomy}>
                </InputNumber>
                <InputNumber
                    size='large'
                    placeholder='enter the expected lifetime miles'
                    onPressEnter={calculateEmissionsFactor}
                ></InputNumber>
            </div>

            {
                emissionsFactor &&
                <InputNumber
                    size='large'
                    placeholder='enter the miles traveled here'
                    onPressEnter={calculateEmissions}>
                </InputNumber>
            }


            {
                (emissions) &&
                <div>
                    <p className="Results">You emitted {emissions} kg CO2</p>
                    <Button size="large" type="primary" onClick={navigateToHome}>Restart</Button>
                </div>
            }
        </div>
  );
}