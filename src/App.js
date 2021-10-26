import { Route, Switch, Redirect } from "react-router-dom";
import React, { Suspense } from "react";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuotes from "./pages/NewQuote";
// import QuoteDetail from "./pages/QuoteDetail";
// import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes'></Redirect>
          </Route>
          <Route path='/new-quote'>
            <NewQuote />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes />
          </Route>
          {/* to remove bug */}
          {/* <Route path='/quotes/new-quote' exact>
          <NewQuotes/>
        </Route> */}
          <Route path='/quotes/:quoteid'>
            <QuoteDetail />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
