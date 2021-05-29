import { Input, Button } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router';

export default function Rail() {
    const history = useHistory();
    const [emissions, setEmissions] = useState(null);
    const [transitIsSelected, setTransitIsSelected] = useState(true);
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

        if (transitIsSelected) { 
            category = "transit";
        } else { 
            category = "commuter";
        }

        fetch("/rail/" + category + "/emissions?miles=" + miles, {
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

    const toggleRailType = () => {
        setTransitIsSelected(!transitIsSelected);
    }

    return (
        <div className="Rail">
            <div className="Title-text">3. Calculate Your Carbon Emissions</div>

            {
                showErrorMessage && 
                <p className="Error-message">Please input a valid number</p>
            }

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