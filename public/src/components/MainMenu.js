import { Button } from 'antd';
import { useHistory } from 'react-router';

export default function MainMenu() {
    const history = useHistory();

    const navigateToTravel = () => {
        history.push('/Travel')
    }

    const navigateToFood = () => {
        history.push('/Food')
    }

    return (
        <div className="MainMenu">
            <Button size="large" type="primary" onClick={navigateToTravel}>
                Travel
          </Button>
            <Button size="large" type="primary" onClick={navigateToFood}>
                Food
              </Button>
        </div>
    );
}