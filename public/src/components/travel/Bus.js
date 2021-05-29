import { InputNumber, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

/**
 * Calculations page for bus, prompts user for mileage and shows their emissions based
 * upon mileage given 
 */
export default function Bus() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
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

    // calculates the emissions given the mileage. Shows an error message if response
    // code is 400
    const calculateEmissions = (value) => {
        let miles = value.target.value;
        fetch("/bus/emissions?miles=" + miles, {
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
        <div className="Bus">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                showErrorMessage && 
                <p className="Error-message">Please input a valid number</p>
            }

            <InputNumber
                size='large'
                placeholder='enter the miles traveled here'
                onPressEnter={calculateEmissions}>
            </InputNumber>

            {
                (emissions) &&
                <div>
                    <p className="Results">You emitted {emissions} kg CO2e</p>
                    <Button size="large" type="primary" onClick={navigateToHome}>Restart</Button>
                </div>
            }
        </div>
  );
}