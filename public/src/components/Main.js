import { Button } from 'antd';
import { useHistory } from 'react-router';

/**
 * Main component which serves as a step 1 to choose a category of emissions to go to. 
 * Navigates to either the Travel page or Food page
 */
export default function Main() {
  const history = useHistory();

  const navigateToTravel = () => {
    history.push('/Travel')
  }

  const navigateToHousing = () => {
    history.push('/Housing')
  }

  return (
    <div className="Main">
      <div className="Title-text">1. Choose a Carbon Footprint Category</div>
      <div className="MainMenu">
        <Button size="large" type="primary" onClick={navigateToTravel}>
          Travel
        </Button>
        <Button size="large" type="primary" onClick={navigateToHousing}>
          Housing
        </Button>
      </div>
    </div>
  );
}