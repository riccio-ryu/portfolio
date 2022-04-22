import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Stock from './routes/Stock';
import Stocks from './routes/Stocks';

function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/:stockId">
                    <Stock />
                </Route>
                <Route path="/">
                    <Stocks />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;