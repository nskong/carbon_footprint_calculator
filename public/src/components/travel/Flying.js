import { InputNumber, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Flying() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
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
        <div className="Flying">
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