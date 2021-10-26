import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import { useParams, Route, Link,useRouteMatch} from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const dummy_quotes = [
//     { id: 'q1', auther: 'max', text: 'learning react is fun!' },
//     { id: 'q2', auther: 'omkar', text: 'react is a greate language' },
// ]

const QuoteDetail = () => {
    const params = useParams()
    const match=useRouteMatch()
    // const quote = dummy_quotes.find(quote => quote.id === params.quoteid)
    const{  sendRequest,status,data:loadedQuates,error}=useHttp(getSingleQuote,true)
    useEffect(()=>{
        sendRequest(params.quoteid)
    },[sendRequest,params.quoteid])

    if(status==='pending')
    {
        return<div className='centered'>
            <LoadingSpinner/>
        </div>
    }
    if(error)
    {
        return <div className='centered'>{error}</div>
    }
    if (!loadedQuates.text) {
        return <h1>NO match</h1>
    }

    return (
        <Fragment>
            <HighlightedQuote author={loadedQuates.auther} text={loadedQuates.text} />
            <Route path={`/quotes/${params.quoteid}`} exact>
                <div className='centered'>
                    {/* <Link className='btn--flat'  to={`/quotes/${params.quoteid}/comment`}>Load Comment</Link> */}
                    <Link className='btn--flat'  to={`${match.url}/comment`}>Load Comment</Link>

                </div>
            </Route>  
            <Route path={`${match.path}/comment`} >
                {/* {match.url} */}
                <Comments />
            </Route>

        </Fragment>
    )
}

export default QuoteDetail;